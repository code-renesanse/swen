# SWEN

## Sketchfab Webpack Engine

* Implement Sketchfab Viewer API with Webpack and create amazing 3D web viewers.

---

# TODO
* [x] Handle empty ('') and undefined strings in *getImage* function 
* [ ] Animation create loadGif type _HTMLElement_
* _HTMLElement 
  * [ ] **removeEventListener**
  * [ ] **setId**
* index.html - template
  * Create html elements with JS
    * [ ] *model-selection-holder* div
    * [ ] *api-frame-holder* div
    * [ ] *wrapper* div
      * [ ] *wrapper-container* div
        * [ ] *dock-wrapper* div
        * [ ] *lang-btn-holder* div
* CSS styles
  * [ ] Remove CSS classes from *addClass* calls
  * [ ] Change slection system:
    ``` 
      var showSelection = function showSelection(_element, _type, _canBeUnselected) {
        if (_element instanceof Array) {
          _element.forEach(function (e) {
            showSelection(e);
          });
        } else {
          var _dom = getDomFromReference(_element);
          if (_canBeUnselected === true) {
            if(_dom.classList.contains('selected-item')){
                _dom.classList.remove('selected-item');
            }
          } else {
              clearSelection(_type);
              showSelection(listItem);
          }
        }
      };
      
      var clearSelection = function clearSelection(_type) {
        let _testElms = document.querySelectorAll(`[${_type}].selected-item`); 
        if(_testElms !== undefined) {
            for(let i = 0; i < _testElms.length; i++) {
                _testElms[i].classList.remove('selected-item'); 
            }
        }

        // if (domRef instanceof Array) {
        //   domRef.forEach(function (e) {
        //     clearSelection(e);
        //   });
        // } else {
        //   var fItem = getDomFromReference(domRef);

        //   if (fItem.classList.contains('bold')) {
        //     fItem.removeClass('bold');
        //   }

        //   var fParent = fItem.parentElement;

        //   if (fParent === null) {
        //     errorLog(fItem.id + " parent element is null");
        //     return;
        //   }

        //   fParent.removeClass('bold');

        //   for (var i = 0; i < fItem.children.length; i++) {
        //     var domChild = fItem.children[i];
        //     domChild.replaceClass('on-hover-dis', 'on-hover');
        //   }
        // }
      };
    ```

* Example objects:
  * [ ] API
  * [ ] Graph 
