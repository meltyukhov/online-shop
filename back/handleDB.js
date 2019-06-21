const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:1234@localhost/romchic');
const Op = Sequelize.Op;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Model = Sequelize.Model;

class Product extends Model {}
Product.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'product'
});

class Desktop extends Model {}
Desktop.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  processor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ram: {
    type: Sequelize.STRING,
    allowNull: false
  },
  diskSpace: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'disk_space'
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'desktop'
});

class Laptop extends Model {}
Laptop.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  display: {
    type: Sequelize.STRING,
    allowNull: false
  },
  processor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  diskSpace: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'disk_space'
  },
  ram: {
    type: Sequelize.STRING,
    allowNull: false
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'laptop'
});

class Phone extends Model {}
Phone.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  diskSpace: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'disk_space'
  },
  ram: {
    type: Sequelize.STRING,
    allowNull: false
  },
  battery: {
    type: Sequelize.STRING,
    allowNull: false
  },
  display: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cameras: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'phone'
});

class Comment extends Model {}
Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    },
    field: 'product_id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  sequelize,
  modelName: 'comment'
});

Desktop.belongsTo(Product, { foreignKey: 'id', sourceKey: 'id' });
Laptop.belongsTo(Product, { foreignKey: 'id', sourceKey: 'id' });
Phone.belongsTo(Product, { foreignKey: 'id', sourceKey: 'id' });
Comment.belongsTo(Product, { foreignKey: 'id', sourceKey: 'id' });

sequelize.sync().then(() => {
  /*Phone.findAll({ include: [ Product ] }).then(instances => {
    instances.forEach(instance => {
      let instanceObj = Object.assign(instance.dataValues.product.dataValues, instance.dataValues);
      delete instanceObj.product;
      for (let key in instanceObj) {
        if (!instanceObj.hasOwnProperty(key)) continue;

        let prop = instanceObj[key];
        if (typeof prop === 'string')
          instanceObj[key] = encodeURIComponent(prop);
      }
      console.log(JSON.stringify(instanceObj));
    });
  });*/
  console.log('Syncronized');
});

const getAll = () => {
  let res = [];
  let promise = new Promise((outer) => {
    Product.findAll().then(instances => {
      const queries = instances.reduce((promiseChain, instance) => {
        return promiseChain.then(() => new Promise((resolve) => {
          res.push(instance.dataValues);
          resolve();
        }));
      }, Promise.resolve());
      queries.then(() => outer({data:res}));
    });
  });
  return promise;
};

const guessType = (type) => {
  const types = {
    'phones': Phone,
    'laptops': Laptop,
    'desktops': Desktop
  }
  return types[type];
}

const encode = (object) => {
  for (let key in object) {
    if (!object.hasOwnProperty(key)) continue;

    let prop = object[key];
    if (typeof prop === 'string')
      object[key] = encodeURIComponent(prop);
  }
}

const getProducts = (type) => {
  let res = [];
  const Model = guessType(type);
  let promise = new Promise((outer) => {
    Model.findAll({ include: [ Product ] }).then(instances => {
      const queries = instances.reduce((promiseChain, instance) => {
        return promiseChain.then(() => new Promise((resolve) => {

          let instanceObj = instance.dataValues.product.dataValues;
          delete instanceObj.product;
          encode(instanceObj);
          res.push(instanceObj);
          resolve();
        }));
      }, Promise.resolve());
      queries.then(() => outer({data:res}));
    });
  });
  return promise;
}

const search = (query) => {
  let res = [];
  let promise = new Promise((outer) => {
    Product.findAndCountAll({ where: { name: { [Op.like]: '%' + query + '%' } } }).then(instances => {
      const queries = instances.rows.reduce((promiseChain, instance) => {
        return promiseChain.then(() => new Promise((resolve) => {
          res.push(instance.dataValues);
          resolve();
        }));
      }, Promise.resolve());
      queries.then(() => outer({
        data: res,
        count: instances.count
      }));
    });
  });
  return promise;
}

module.exports = {
  getAll: getAll,
  getProducts: getProducts,
  search: search
}
