let pointText = document.getElementById('pointText');
point = 0;

pointText.innerHTML = "0"

const cardTemplate = `
    <div class="card-panel">
        <div class="card-front">
            <img src="https://via.placeholder.com/100x100?text=?">
        </div>

        <div class="card-back">
            <img src="">
        </div>
    </div>
`;
//Görev 2
let randomNum = function() {
    let randomArray = [];
    while (randomArray.length < 8) {
        let randomNumber = Math.floor(Math.random() * 99) + 1; // 1 ile 99 arasında sayı
        if (!randomArray.includes(randomNumber)) {
            randomArray.push(randomNumber, randomNumber); // Çift olarak ekliyoruz
        }
    }
    return randomArray.sort(() => Math.random() - 0.5); // Karıştırarak döndürüyoruz
};

const photoNumbers = randomNum();
/*
Görev 2: Bu numaraları 1-99 arası(1 ve 99 dahil) sayılardan rastgele 4 çift oluşturacak şekilde üreten bir fonksiyon yazarak, kod bloğundaki array değerini bu fonksiyondan dönen array ile değiştiren kodları yazın
*/
//const photoNumbers = [10, 20, 30, 20, 10, 40, 40, 30];


console.log(photoNumbers);

for (photoNumber of photoNumbers) {
    const newCard = document.createElement("div");
    newCard.innerHTML = cardTemplate;
    newCard.classList.add("card");
    newCard.querySelector(".card-back img").src = `https://lipsum.app/id/${photoNumber}/100x100`;
    document.querySelector("div#game-panel").append(newCard);

    //Her bir karta tıklandığında "cardClick" fonksiyonu çalışacak.
    newCard.addEventListener("click", cardClick);
}

function cardClick(event) {
    //Tıklanan kartı seçilen olarak değişkene atayalım
    const selectedCard = event.currentTarget;

    //Tıklanan kart eslesti classına sahipse daha önce başka kartla eşleşmiş ve zaten açık durumda demektir, işlem yapmayacağız.
    if (selectedCard.classList.contains("match") === true) {
        return;
    }

    //Tıklanan ve açılan karta tekrar tıklanırsa işlem yapmayacağız.
    if (selectedCard.classList.contains("open") === true) {
        return;
    }

    //Peşpeşe kartlara tıklandığında 2'den fazla kart tıklanmasını engellememiz gerekiyor.
    const allOpenCards = document.querySelectorAll(".open");
    if (allOpenCards.length === 2) {
        return;
    }

    //Açık olan kart varsa seçelim.
    const openCard = document.querySelector(".open");

    //Hiç açık kart yoksa tıklanan karta açık class veriyoruz ve fonksiyondan çıkıyoruz.
    if (openCard === null) {
        selectedCard.classList.add("open");

        setTimeout(
            () => {
                selectedCard.classList.remove("open");
            }, 1500
        );
        return;
    }

    //Daha önce bir açık kartımız varmış, son seçilen karta da açık class vererek tersini çevirelim.
    selectedCard.classList.add("open");

    //Açık kartlara ait img etiketlerinin src görsel dosyaları eşleşiyor mu?
    const openCardImg = openCard.querySelector(".card-back img");
    const selectedCardImg = selectedCard.querySelector(".card-back img");

    if (openCardImg.src === selectedCardImg.src) {
      //İki açık kart arasında eşleşme var.
      openCard.classList.add("match");
      selectedCard.classList.add("match");

      point++;

      console.log(point);

      pointText.innerHTML = point;

      /*
            Görev 1: Kullanıcı 4 kartı da eşleştirdiğinde sayfa ortasında beliren hareketli gif dosyası formatında bir kutlama görseli belirsin ve bu fotoğraf 5 saniye sonra ortadan kaybolsun.
        */
            if (point === 4) {
                showCelebration();
            }


      openCard.classList.remove("open");
      selectedCard.classList.remove("open");

      setTimeout(() => {
        openCard.removeEventListener("click", cardClick);
        selectedCard.removeEventListener("click", cardClick);
      }, 1000);
    } else {
        //İki açık kartın görsel dosya adı birbirinden farklı, eşleşme yok, kartlar kapansın.
        setTimeout(() => {
            openCard.classList.remove("open");
            selectedCard.classList.remove("open");
        }, 1500);
    }
}

function showCelebration() {
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    setTimeout(() => {
        celebration.classList.add('hidden');
    }, 5000);
}