// chrome.runtime.sendMessage({ greeting: 'hi' }, function (response) {
//     console.log(response.received);
// });

// import process_forms from "./action";
console.log("click");
// debugger;
fetch(chrome.runtime.getURL("./suggest/wepage9.html"))
  .then((r) => r.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterbegin", html);
    // debugger;
    // $(document).ready(function () {
    // document.getElementById("login_btn").addEventListener("click", function () {
    //   //   $("#main").load("suggest/wepage9.html");
    //   chrome.extension.getURL("./suggest/wepage9.html");
    // });
    // });
  });

const avatar = document.getElementsByClassName("avatar");
const address = document.getElementsByClassName("address");
const rating = document.getElementsByClassName("bi-circle");

const avatar_fetch = async function () {
  const response = await fetch("http://localhost:3000/groupInstance");
  // debugger;
  const data = await response.json();
  for (i = 0; i < data.relatedUsers.length; i++) {
    avatar[i].src = data.relatedUsers[i].thumbnailImageUrl;
    // debugger;

    address[i].innerHTML =
      data.instancesByUser[0].instances.instances[i][5].value;
  }

  Array.prototype.forEach.call(address, function (add, index) {
    add.addEventListener("click", function () {
      //   debugger;
      console.log(index);
      var text = address[index].innerText;
      var text_split = text.split(" ");
      function getElementByXpath(path) {
        return document.evaluate(
          path,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      }
      var ele;
      async function process_forms() {
        const response = await fetch("http://localhost:3000/groupInstance");
        const data = await response.json();

        const response2 = await fetch("http://localhost:8008/fields");
        const data2 = await response2.json();
        // debugger;
        for (
          i = 0;
          i < data.instancesByUser[0].instances.instances[0].length - 1;
          i++
        ) {
          ele = getElementByXpath(data2[i].xpath);
          //   debugger;
          var reg =
            data.instancesByUser[0].instances.instances[index][i]
              .formattedValue;
          var ex = reg.split(" ");
          //   debugger;
          if (
            data2[i].property_name ==
              data.instancesByUser[0].instances.instances[index][i].name &&
            data2[i].type == ele.type
          ) {
            debugger;
            // if (text_split[index] == ex[index]) {
            //   debugger;
            ele.value =
              data.instancesByUser[0].instances.instances[index][
                i
              ].formattedValue;
            // }
          } else if (data2[i].type == "select-one") {
            if (
              ele.options[i].value ==
              data.instancesByUser[0].instances.instances[index][i]
                .formattedValue
            ) {
              debugger;
              ele.value =
                data.instancesByUser[0].instances.instances[index][
                  i
                ].formattedValue;
            }
          } else {
            console.log("error");
            ele.value =
              data.instancesByUser[0].instances.instances[index][
                i + 1
              ].formattedValue;
          }
        }
        // }
      }

      process_forms();
    });
  });

  //   });
  console.log(data);
};
avatar_fetch();
