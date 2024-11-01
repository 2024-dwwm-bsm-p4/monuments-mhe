const monuments = {
    "Tour Eiffel": {
        ville: "Paris",
        description: "La Tour Eiffel est un monument emblématique de Paris, construit par Gustave Eiffel pour l'Exposition universelle de 1889. Mesurant 330 mètres de hauteur, elle est faite de fer et est un symbole mondial de la France.",
        coords: [48.8588443, 2.2943506]
    },
    "Notre-Dame": {
        ville: "Paris",
        description: "La Cathédrale Notre-Dame de Paris est un chef-d'œuvre gothique célèbre pour ses rosaces, ses tours et ses gargouilles. Elle a été au cœur de l'histoire de France depuis le Moyen Âge.",
        coords: [48.853, 2.3499]
    },
    "Arc de Triomphe": {
        ville: "Paris",
        description: "L'Arc de Triomphe est un monument commandé par Napoléon pour honorer les victoires de ses armées. Il est situé au sommet de l'avenue des Champs-Élysées.",
        coords: [48.8738, 2.295]
    },
    "Mont Saint-Michel": {
        ville: "Normandie",
        description: "Le Mont Saint-Michel est un site de pèlerinage médiéval et une île rocheuse connue pour son abbaye gothique et ses fortifications. Il se dresse majestueusement sur la côte normande.",
        coords: [48.6361, -1.5115]
    },
    "Versailles": {
        ville: "Versailles",
        description: "Le Château de Versailles est une ancienne résidence royale, célèbre pour ses jardins à la française et sa galerie des glaces. Il est l'un des plus grands symboles du pouvoir absolu des rois de France.",
        coords: [48.8049, 2.1204]
    }
};

const images = document.querySelectorAll('.img-fluid');

// Fonction pour mettre l'image en couleur et les autres en noir et blanc
function setActiveImage(clickedImage) {
    images.forEach(image => {
        if (image === clickedImage) {
            image.style.filter = "grayscale(0%)"; 
            image.style.transform = "scale(1.1)"; 
        } else {
            image.style.filter = "grayscale(100%)"; 
            image.style.transform = "scale(1)";   
        }
    });
}

// Ajouter l'événement de clic sur chaque image
images.forEach(image => {
    image.addEventListener('click', () => setActiveImage(image));
});

document.querySelectorAll('.monument-btn, .img-fluid').forEach(button => {
    button.addEventListener('click', () => {
        const monumentInfo = document.getElementById('monument-info');
        const map = document.getElementById('map');

        monumentInfo.classList.remove('slide-in');
        monumentInfo.classList.add('slide-out');
        map.classList.remove('slide-in');
        map.classList.add('slide-out');

        setTimeout(() => {
            monumentInfo.classList.remove('slide-out');
            monumentInfo.classList.add('slide-in');
            map.classList.remove('slide-out');
            map.classList.add('slide-in');
        }, 500);
    });
});


// Centre de la France
const map = L.map('map').setView([46.603354, 1.888334], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// affiche la description d'un monument
function showMonumentInfo(monument) {
    const info = monuments[monument];
    document.getElementById('monument-name').innerText = monument;
    document.getElementById('monument-description').innerHTML = `
        <strong>${info.ville}, France</strong><br>
        ${info.description}
    `;

    // Centrer la carte et ajouter un marqueur à la ville
    map.setView(info.coords, 10);
    L.marker(info.coords).addTo(map)
        .bindPopup(`<strong>${monument}</strong><br>${info.ville}, France`)
        .openPopup();
}