# SWEN

## Sketchfab Webpack Engine

* Implement Sketchfab Viewer API with Webpack and create amazing 3D web viewers.

---

# Working on

* clean-up **src/dom/loadingbar/create**:
  * [x] Loading bar get created when a user clicks on a **_Card_** to load the model
  * [x] Remove ```loadingbar.style.opacity = '0';```
  * [x] Move svg loading to a separate file

# TODO

* [ _wrapper_ ] 
  * [ ] Remove ```wrapper.style.opacity = '1';```
  * [ ] Only show wrapper when the wrapper is created

* [ ] [ _Card_ ] make all of the card DOM elements accessable to child classes 

* [ ] [ _Card_ ] card load holder hover text, make it so that the text is defined in the constructor or some other way

* [ ] [ _Component_ ]Rename **dockItem** to content in the **_Component** class

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


* _HTMLElement 
  * [ ] Consider removing this custom HTML Element type / implementation as it is redundant

* createElement
  * [ ] Remove aall of the custom functions

* CSS styles
  * [ ] Remove CSS classes from *addClass* calls

* Change slection system:
    * [ ] Clean up show/clearSelecrtion functions

* Example objects:
  * [ ] API
  * [ ] Graph 
