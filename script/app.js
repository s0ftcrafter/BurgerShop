const products = {
  crazy: {
    price: 31000,
    name: "Crazy",
    amount: 0,
    img: "images/products/burger-1.png",
    get totalPrice() {
      return this.price * this.amount;
      {
      }
    },
  },
  light: {
    price: 26000,
    name: "Light",
    amount: 0,
    img: "images/products/burger-2.png",
    get totalPrice() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    price: 29000,
    name: "CheeseBurger",
    amount: 0,
    img: "images/products/burger-3.png",
    get totalPrice() {
      return this.price * this.amount;
    },
  },
  dburger: {
    price: 24000,
    name: "dBurger",
    amount: 0,
    img: "images/products/burger-4.png",
    get totalPrice() {
      return this.price * this.amount;
    },
  },
};

// elHTML.closest() = обращается к ближайщему родительскому  элементу

const productsBtns = document.querySelectorAll(".wrapper__list-btn"),
  basketBtn = document.querySelector(".wrapper__navbar-btn"),
  basketBtnCount = basketBtn.querySelector(".warapper__navbar-count"),
  basketModal = document.querySelector(".wrapper__navbar-basket"),
  basketBtnClose = document.querySelector(".wrapper__navbar-close"),
  totalPriceSpan = document.querySelector(".wrapper__navbar-totalprice"),
  orderBasketBtn = document.querySelector(".wrapper__navbar-bottom"),
  basketChecklist = document.querySelector(".wrapper__navbar-checklist"),
  print__body = document.querySelector(".print__body"),
  print__footer = document.querySelector(".print__footer");

productsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addBurger(btn);
  });
});

function addBurger(btn) {
  const parent = btn.closest(".wrapper__list-card");
  const parentID = parent.id;
  products[parentID].amount++;
  addToBasket();
}

function addToBasket() {
  let basketArr = [];

  for (let key in products) {
    const po = products[key];
    const productCard = document.querySelector(`#${po.name.toLowerCase()}`);
    const productIndecator = productCard.querySelector(".wrapper__list-count");

    if (po.amount) {
      basketArr = [...basketArr, po];
      productIndecator.classList.add("active");
      productIndecator.innerHTML = po.amount;
    } else {
      productIndecator.classList.remove("active");
      productIndecator.innerHTML = 0;
    }
  }

  const allAmount = totalAmount();
  if (allAmount) {
    basketBtnCount.classList.add("active");
    basketBtnCount.innerHTML = allAmount;
  } else {
    basketBtnCount.classList.remove("active");
  }

  totalPriceSpan.innerHTML = totalPrice().toLocaleString("ru") + " сум";

  basketChecklist.innerHTML = "";
  basketArr.forEach((item) => {
    basketChecklist.innerHTML += addCardItem(item);
  });

  function addCardItem(item) {
    const { name, totalPrice: price, img, amount } = item;

    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img class="wrapper__navbar-productImage" src="${img}" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${price.toLocaleString()}</span> сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
`;
  }
}

function totalAmount() {
  let total = 0;
  for (const key in products) {
    total += products[key].amount;
  }
  return total;
}
function totalPrice() {
  let total = 0;
  for (const key in products) {
    total += products[key].totalPrice;
  }
  return total;
}

basketBtn.addEventListener("click", () => basketModal.classList.add("active"));

basketBtnClose.addEventListener("click", () =>
  basketModal.classList.remove("active"),
);

// window - это глобальный обьект окна браузера

window.addEventListener("click", (event) => {
  const btn = event.target;
  if (btn.classList.contains("wrapper__navbar-symbol")) {
    const attr = btn.getAttribute("data-symbol");
    const parent = btn.closest(".wrapper__navbar-option");
    if (parent) {
      const parentID = parent.id.split("_")[0];
      if (attr == "-") products[parentID].amount--;
      if (attr == "+") products[parentID].amount++;
      addToBasket();
    }
  }

  orderBasketBtn.addEventListener("click", () => {
    print__body.innerHTML = "";
    for (let key in products) {
      const item = products[key];
      const { name, totalPrice: price, img, amount } = item;
      if (amount) {
        print__body.innerHTML += `
    <div class="print__body-item">
        <p class="print__body-item_name">
            <span class="name">${name}</span>
            <span class="count">${amount}</span>
        </p>
        <p class="print__body-item_summ">${price}</p>
    </div>
    `;
      }
    }
    print__footer.innerHTML = totalPrice().toLocaleString();
    print();
    window.location.reload();
  });
});

function gencolor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b}`;
}

function lvl() {
  const parent = document.getElementById("counter");
  const p = document.createElement("p");

  parent.appendChild(p);

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      p.style.textAlign = "center";
      p.style.fontSize = "50px";
      p.style.fontStyle = "italic";
      p.style.fontWeight = "800";
      p.style.padding = " 15px";
      {
        p.style.color = gencolor();
      }
      p.innerHTML = i;
      if (i == 99) {
        p.style.color = "black";
        p.innerHTML = "100 LVL!";
      }
    }, 100 * i);
  }
}

lvl();
