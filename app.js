
function getElement (selection) {
    const element = document.querySelector(selection);
    if(element) {
        return element;
    }
    throw new Error(`Please double check your class names, there is no ${selection} class`);
};


function Gallery (element) {
    this.container = element;

    // console.log(element);
    this.list = [...element.querySelectorAll('img')];
    // console.log(this.list)

    // Target the model
    this.model = getElement('.model'); 
    this.miniImg = getElement('.mini-img');
    this.imageName = getElement('.image-name');
    this.modelImages = getElement('.model-images');
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement(".next-button");
    this.preBtn = getElement(".pre-button");

    // Bind the event listener to the container
    // this.openModel = this.openModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.preImage = this.preImage.bind(this);

    // Add event listener to the container
    this.container.addEventListener('click', 
        function(e) {
        // console.log(this)
        if(e.target.classList.contains('img')) {

            this.openModel(e.target, this.list);
        }
    }.bind(this)
);   
}

Gallery.prototype.openModel = function(selectedImage, list) {
    // console.log(this);
    // console.log(selectedImage, list);
    this.setMainImage(selectedImage);
    this.modelImages.innerHTML = list
    .map(function(img) {
        return `<img src="${img.src}" title="${img.title}" data-id="${img.dataset.id}"
        class="${selectedImage.dataset.id === img.dataset.id ? "modal-img selected" : "modal-img"}"/>`;
    }).join(" ");
    this.model.classList.add('open');
    this.closeBtn.addEventListener('click', this.closeModel)
    this.nextBtn.addEventListener('click', this.nextImage)
    this.preBtn.addEventListener('click', this.preImage)
}

Gallery.prototype.setMainImage = function(selectedImage) {
    this.miniImg.src = selectedImage.src
    this.imageName.textContent = selectedImage.title
}

Gallery.prototype.closeModel = function() {
    this.model.classList.remove('open'); 
    this.closeBtn.removeEventListener('click', this.closeModel)
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.preBtn.removeEventListener("click", this.preImage);
}

Gallery.prototype.nextImage = function() {};
Gallery.prototype.preImage = function () {};

const mountain = new Gallery(getElement('.mountain'));
const city = new Gallery(getElement('.city'));