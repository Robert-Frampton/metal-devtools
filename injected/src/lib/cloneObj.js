export const ITERABLE_KEY = '@@__IMMUTABLE_ITERABLE__@@';

/**
 * Copied pattern from MDN, https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
 *
 * This function sanatizes and clones the state object that comes from the metal
 * component. Sanitization is necessary before we can do message passing.
 */
function cloneObj(objectToBeCloned, visited = new Set()) {
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  let objectClone;

  try {
    if (objectToBeCloned && objectToBeCloned[ITERABLE_KEY]) {
      objectToBeCloned = objectToBeCloned.toJS();
    }

    const Constructor = objectToBeCloned.constructor;

    switch (Constructor) {
      case RegExp:
        objectClone = new Constructor(objectToBeCloned);
        break;
      case Date:
        objectClone = new Constructor(objectToBeCloned.getTime());
        break;
      case Function:
        objectClone = {
          __metal_devtools_read_only: true
        };

        if (objectToBeCloned.name) {
          objectClone.value = `${objectToBeCloned.name}()`;
        } else if (objectToBeCloned.__jsxDOMWrapper) {
          objectClone.value = '<JSXElement />';
        } else {
          objectClone.value = 'function()';
        }
        break;
      default:
        try {
          objectClone = new Constructor();
        } catch (err) {
          objectClone = Constructor.name;
        }
    }
  } catch (err) {
    console.log(
      '%c metal-devtools extension: (`clone`)\n',
      'background: rgb(136, 18, 128); color: #DDD',
      err
    );
    console.log(
      '%c Args:',
      'background: rgb(136, 18, 128); color: #DDD',
      objectToBeCloned
    );
  }

  if (objectClone instanceof Object) {
    visited.add(objectToBeCloned);

    for (const key in objectToBeCloned) {
      if (Object.prototype.hasOwnProperty.call(objectToBeCloned, key)) {
        const prop = objectToBeCloned[key];

        if (typeof prop !== undefined) {
          objectClone[key] = visited.has(prop)
            ? '[Circular]'
            : cloneObj(prop, visited);
        }
      }
    }

    visited.delete(objectToBeCloned);
  }

  return objectClone;
}

export default cloneObj;
