var models = [
    {
        name: "Bmw",
        image: "İmg/bmw.jpg",
        link: "https://www.pexels.com/tr-tr/fotograf/yesil-cim-cimenlerin-yaninda-mavi-bmw-sedan-170811/"
    },
    {
        name: "Mercedes",
        image: "İmg/Mercedes.jpg",
        link: "https://www.pexels.com/tr-tr/fotograf/gri-mercedez-benz-amg-112460/"
    },
    {
        name: "Range Rover",
        image: "İmg/Range.jpg",
        link: "https://www.pexels.com/tr-tr/fotograf/beyaz-land-rover-range-rover-suv-yolda-116675/"
    },
    {
        name: "Audi",
        image: "İmg/audi.jpg",
        link: "https://www.pexels.com/tr-tr/fotograf/mavi-audi-sedan-ormanin-yakinina-park-edilmis-244206/"
    },
    {
        name: "Lamborgini",
        image: "İmg/lamborgini.jpg",
        link: "https://www.pexels.com/tr-tr/fotograf/siyah-lamborghini-fotografi-3802508/"
    }
];

var index = 0;
var slaytCount = models.length;
var interval;

var settings = {
    duration: 2000,
    random: false
};

init(settings);

document.getElementById("left").addEventListener("click", function () {
    index--;
    showSlide(index);
    console.log(index);
})
document.getElementById("right").addEventListener("click", function () {
    index++;
    showSlide(index);
    console.log(index);
})
document.querySelectorAll(".arrow").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
        clearInterval(interval)
    })
});
document.querySelectorAll(".arrow").forEach(function (item) {
    item.addEventListener("mouseleave", function () {
        init(settings);
    })
});

function init(settings) {
    var prev;
    interval = setInterval(function () {
        if (settings.random) {
            //random index
            do {
                index = Math.floor(Math.random() * slaytCount);
            } while (index == prev)
            prev = index;

        } else {
            //rising index
            if (slaytCount == index + 1) {
                index = -1;
            }
            showSlide(index);
            console.log(index);
            index++;
        }
        showSlide(index);
    }, settings.duration);
}

function showSlide(i) {
    index = i;
    if (i < 0) {
        index = slaytCount - 1;
    }
    if (i >= slaytCount) {
        index = 0;
    }
    document.querySelector(".card-img-top").setAttribute("src", models[index].image);
    document.querySelector(".card-title").textContent = models[index].name;
    document.querySelector(".card-link").setAttribute("href", models[index].link);
};

