const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");
const axios = require("axios");
//
const categories = [
  {
    id: "laptop",
    name: "Laptop",
    image:
      "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/small_image/450x/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-vivobook-r564ja-uh51t-11.jpg",
  },
  {
    id: "smart_phone",
    name: "SmartPhone",
    image:
      "https://fscl01.fonpit.de/userfiles/7446224/image/best-smartphones-2018/best-smartphones-2018-front-closeup.jpg",
  },
  {
    id: "tablet",
    name: "Tablet",
    image: "https://cdn.mos.cms.futurecdn.net/DVgdvxbLT2HDCX7drM38ST.jpg",
  },
  {
    id: "accessories",
    name: "Accessory",
    image:
      "https://image.made-in-china.com/2f0j00vtfYuaPlvBqO/Professional-Mobile-Phone-Accessories-Factory-for-Samsung-for-iPhone-Mobile-Phone.jpg",
  },
];
//fucntion set meta
function setMeta(response, name, image, description) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, name);
    data = data.replace(/\$OG_DESCRIPTION/g, name + " page description");
    result = data.replace(/\$OG_IMAGE/g, image);
    response.send(result);
  });
}

// function fetchApi()
async function fetchApi(cate, id) {
  try {
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

//set meta for home
app.get("/", function (request, response) {
  console.log("Home page visited!");
  setMeta(
    response,
    "home",
    "https://shop-cnweb.herokuapp.com/static/media/newLogo6.d9ad15ec.png"
  );
});

app.get("/favicon.ico", (req, res) => {
  return "your faveicon";
});
app.get("/manifest.json", (req, res) => {
  return "your manifest";
});

// set meta for catefory and id_product
app.get("/:cate/:id", function (request, response) {
  const cate = request.params.cate;
  const id = request.params.id || null;
  console.log(cate, id);
  if (id) {
    axios
      .get("https://tgdd.azurewebsites.net/products/" + id)
      .then((result) => {
        console.log(result);
        setMeta(response, result.data.name, result.data.images[0].url);
      });
  } else {
    let cateInfor = categories.find(({ id }) => id === cate);
    console.log(cateInfor);
    if (categories !== undefined) {
      setMeta(response, cateInfor.name, cateInfor.image);
    }
  }
});
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
