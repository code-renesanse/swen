# SWEN

## Sketchfab Webpack Engine

* Implement Sketchfab Viewer API with Webpack and create amazing 3D web viewers.

---

# TODO

* [ ] clean-up **src/dom/loadingbar/create**

* Loading bar
  * [x] **wordsSpin** is depricated remove it
  * [x] Implement the new **loading=holder** and **loading-progress**
  * [x] Clean up **createLoadingbar** function

* [ ] [ _Card_ ] make all of the card DOM elements accessable to child classes 

* [ ] [ _Card_ ] card load holder hover text, make it so that the text is defined in the constructor or some other way

* [ ] **createDockTitleButton** remove on-click functionality
  *  on-click functionality should be implemented in the app itself not in the engine
  * example code:
    ```
        this.title.addEventListener('click', () => {
          document.querySelectorAll('#dock-item-content').forEach(_e => {
              if (_e !== this.dockItem) {
                     _e.replaceClass('d-flex', 'd-none');
                 }
             });

             if (this.dockItem.hasClass('d-flex')) {
                 this.dockItem.replaceClass('d-flex', 'd-none');
             } else {
                 this.dockItem.addClass('d-flex');
             }
        });
      ```

* [ ] Rename **dockItem** to content in the **_Component** class

* [x] Handle empty ('') and undefined strings in *getImage* function 

* [ ] Animation create loadGif type _HTMLElement_

* _HTMLElement 
  * [ ] **removeEventListener**
  * [x] **setId**
  * [ ] Consider removing this custom HTML Element type / implementation as it is redundant
  * [x] Remove selectUnselectButtonFunction because it is depricated and buggy

* index.html - template
  * Create html elements with JS
    * [x] *model-selection-holder* div
    * [X] *api-frame-holder* div
    * [x] *wrapper* div
      * [x] *wrapper-container* div
        * [x] *dock-wrapper* div
        * [x] *lang-btn-holder* div

* createElement
  * add return to functions:
    * [ ] addClass
    * [ ] removeClass
    * [ ] replaceClass
    * [ ] addProperty
    * [ ] getProptery

* CSS styles
  * [ ] Remove CSS classes from *addClass* calls

* Change slection system:
    * [x] update ```showSelection```
    * [x] update ```clearSelection```
    * [x] Tests for show/clearSelection
    * [ ] Clean up show/clearSelecrtion functions

* Example objects:
  * [ ] API
  * [ ] Graph 
