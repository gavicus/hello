const dbName = 'worldsmith';
const dbVersion = 1;
const tables = ['entry'];

const getDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);
    request.onerror = event => { reject(event); };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onupgradeneeded = event => {
      const freshDb = event.target.result;
      for (var tableName of tables) {
        freshDb.createObjectStore(tableName, {autoIncrement: true});
      }
      if(freshDb){ resolve(freshDb); }
    };
  });
};

const getStore = (tableName, mode) => {
  return new Promise((resolve, reject) => {
    getDb().then(db => {
      const transaction = db.transaction([tableName], mode);
      transaction.onerror = event => { reject(); };
      resolve(transaction.objectStore(tableName));
    });
  });
};

const update = (tableName, entry, key) => {
  return new Promise((resolve, reject) => {
    getStore(tableName, 'readwrite').then(store => {
      const request = store.put(entry, key);
      request.onsuccess = event => {
        resolve({key: event.target.result, value:entry});
      };
    });
  });
};

const database = () => {

  return {

    crud: (tableName) => {
      return {

        find: isAMatch => {
          return new Promise((resolve, reject) => {
            getDb().then(db => {
              const transaction = db.transaction(tableName, 'readonly');
              const store = transaction.objectStore(tableName);
              const cursorRequest = store.openCursor();
              cursorRequest.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                  if (isAMatch(cursor.value)) {
                    resolve({key: cursor.key, value: cursor.value});
                  } else {
                    cursor.continue();
                  }
                }
              };
            });
          });
        },

        filter: isAMatch => {
          return new Promise((resolve, reject) => {
            getDb().then(db => {
              const transaction = db.transaction(tableName, 'readonly');
              const store = transaction.objectStore(tableName);
              const cursorRequest = store.openCursor();
              const results = [];
              cursorRequest.onsuccess = event => {
                const cursor = event.target.result;
                if (cursor) {
                  if (isAMatch(cursor.value)) {
                    results.push({key: cursor.key, value: cursor.value});
                    cursor.continue();
                  }
                } else {
                  resolve(results);
                }
              };
              cursorRequest.onerror = event => {
                reject();
              };
            });
          });
        },

        updateFromText: text => {
          const parsed = JSON.parse(text);
          for (const item of parsed) {
            console.log('key', item.key);
            console.log('value', item.value);
            update(tableName, item.value, item.key);
          }
        },

        create: entry => {
          return new Promise((resolve, reject) => {
            getStore(tableName, 'readwrite').then(store => {
              const request = store.add(entry);
              request.onsuccess = event => {
                resolve({key: event.target.result, value:entry});
              };
            });
          });
        },

        read: key => {
          return new Promise((resolve, reject) => {
            getStore(tableName).then(store => {
              const request = store.get(key);
              request.onsuccess = () => {
                resolve({key:key, value:request.result});
              };
            });
          });
        },

        update: (entry, key) => update(tableName, entry, key),

        delete: key => {
          return new Promise((resolve, reject) => {
            getDb().then(db => {
              const request = db.transaction(tableName, 'readwrite')
                .objectStore(tableName)
                .delete(key);
              request.onsuccess = event => {
                resolve({status:event, key:key});
              };
            });
          });
        },

      }; // return
    }, // crud
  }; // return
}; // const database

export default database;
