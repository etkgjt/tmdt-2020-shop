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
//convert description
function convertDescription(description = {}) {
  return Object.keys(description).reduce(
    (stringDes, key) =>
      (stringDes +=
        key !== "id" && key !== "productId"
          ? `${key}: ${description[key]} `
          : ""),
    ""
  );
}

//fucntion set meta
function setMeta(response, url, name, image = "", description) {
  let newDescription = `this is ${name} page`;
  if (description) newDescription = convertDescription(description);
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_URL/g, "https://shop-cnweb.herokuapp.com" + url);
    data = data.replace(/\$OG_TITLE/g, name + " page");
    data = data.replace(/\$OG_DESCRIPTION/g, newDescription);
    result = data.replace(/\$OG_IMAGE/g, image);
    response.send(result);
  });
}

//set meta for home
app.get("/", function (request, response) {
  setMeta(
    response,
    "/",
    "home",
    "https://www9.lunapic.com/do-not-link-here-use-hosting-instead/162597670243019950?9737121116"
  );
});

app.get("/favicon.ico", (req, res) => {
  return "your faveicon";
});
app.get("/manifest.json", (req, res) => {
  return "your manifest";
});

app.get("/robots.txt", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "robots.txt");
  response.sendFile(filePath);
});
app.get("/sitemap.xml", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "sitemap.xml");
  response.sendFile(filePath);
});

//get cate
app.get("/:cate", function (request, response) {
  const cate = request.params.cate;
  if (cate) {
    let cateInfor = categories.find(({ id }) => id === cate);
    if (cateInfor) {
      setMeta(response, "/" + cate, cateInfor.name, cateInfor.image);
    } else {
      setMeta(
        response,
        "/" + cate,
        cate,
        "https://shop-cnweb.herokuapp.com/static/media/newLogo6.d9ad15ec.png"
      );
    }
  }
});

// set meta for catefory and id_product
app.get("/:cate/:name", function (request, response) {
  const cate = request.params.cate;
  const name = request.params.name || null;
  if (name) {
    axios
      .get("https://tgdd.azurewebsites.net/products/" + name.split("_").pop())
      .then((result) => {
        setMeta(
          response,
          `/${cate}/${name}`,
          result.data.name,
          result.data.images[0]?.url,
          result.data.descriptions[0]
        );
      });
  }
});
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
