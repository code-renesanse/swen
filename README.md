# SWEN

## Sketchfab Webpack Engine

* Implement Sketchfab Viewer API with Webpack and create amazing 3D web viewers.

---

# Working on
  

---

# TODO

* [ ] **createSubelementsHolder** - depricated
* [ ] card li element have a button that contains the img
* [ ] [ _Card_ ] change addConfigurationComponent to load the component class
  * instead fo just a function

* [ ] Look into css **visually-hidden** insted of display: none

* [ ] Look into linking button elements with meta data
  * ``` https://www.youtube.com/watch?v=YAqRQoN8ykI ```

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

--- 

# Done


* [x] [ #model-selection=holder ] card generation as li element instead of div

* [x] [ #model-selection=holder ] Make **model-selection-holder** a list
  * now it gets created as an div
  * change it to ul list

* [x] clean-up **src/dom/loadingbar/create**:

* [x] Loading bar get created when a user clicks on a **_Card_** to load the model

* [x] Remove ```loadingbar.style.opacity = '0';```

* [x] Move svg loading to a separate file

* [ _wrapper_ ] 
  * [x] Remove ```wrapper.style.opacity = '1';```
  * [x] Move wrapper creation after model has loaded
  * [x] Only show wrapper when the wrapper is created

* [x] [ _Card_ ] make all of the card DOM elements accessable to child classes 

* [x] [ _Card_ ] card load holder hover text, make it so that the text is defined in the constructor or some other way

* [x] [ _Component_ ] Rename **dockItem** to **content** in the **_Component** class

* [x] **createDockTitleButton** remove on-click functionality
  * on-click functionality should be implemented in the app itself not in the engine
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

