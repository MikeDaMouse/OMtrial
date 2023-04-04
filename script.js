document.addEventListener("DOMContentLoaded", () => {
	let carouselCreated = false;
	let bootstrapCarousel;
	const galleryContainer = document.querySelector(".gallery-container");

	function createCarousel(clickedImage, index) {
		if (!carouselCreated) {
			const carousel = document.createElement("div");
			carousel.id = "imageCarousel";
			carousel.className = "carousel slide";
			carousel.setAttribute("data-bs-ride", "carousel");
			carousel.innerHTML = `
        <div class="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <button class="carousel-close" type="button">
          <span class="fas fa-times" aria-hidden="true"></span>
        </button>
      `;

			document.querySelector(".gallery-wrapper").appendChild(carousel);

			const carouselInner = carousel.querySelector(".carousel-inner");

			galleryImages.forEach((image, i) => {
				const carouselItem = document.createElement("div");
				carouselItem.className =
					"carousel-item" + (i === index ? " active" : "");
				carouselItem.innerHTML = `<img src="${
					image.src
				}" class="d-block w-100" alt="Image ${i + 1}">`;
				carouselInner.appendChild(carouselItem);
			});

			bootstrapCarousel = new bootstrap.Carousel(carousel, {
				interval: false,
			});

			carousel
				.querySelector(".carousel-close")
				.addEventListener("click", () => {
					carousel.style.display = "none";
					galleryContainer.style.transform = "scale(1)";
				});

			carouselCreated = true;
		} else {
			const carousel = document.getElementById("imageCarousel");
			bootstrapCarousel.to(index);
			carousel.style.display = "flex";
		}

		galleryContainer.style.transform = "scale(0.7)"; // Adjust the scale value to shrink the gallery as needed
	}

	const galleryImages = document.querySelectorAll(".gallery-image");

	galleryImages.forEach((image, index) => {
		image.addEventListener("click", () => {
			createCarousel(image, index);
		});
	});
});
