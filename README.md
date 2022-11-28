# SWEN

## Sketchfab Webpack Engine

* Implement Sketchfab Viewer API with Webpack and create amazing 3D web viewers.

---

# TODO
* [x] Handle empty ('') and undefined strings in *getImage* function 
* [ ] Animation create loadGif type _HTMLElement_
* _HTMLElement 
  * [ ] **removeEventListener**
  * [x] **setId**
  * [ ] Consider removing this custom HTML Element type / implementation as it is redundant
  * [ ] Remove selectUnselectButtonFunction because it is depricated and buggy
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
    * [ ] Tests for show/clearSelection
    * [ ] Clean up show/clearSelecrtion functions

* Example objects:
  * [ ] API
  * [ ] Graph 
