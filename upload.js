document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  const pageTitle = document.getElementById("page-title");
  const deployButton = document.getElementById("deploy-button");
  const downloadButton = document.getElementById("download-button");

  const popup = document.getElementById("popup");

  const upload = document.getElementById("upload");

  const canvas = document.getElementById("canvas");

  const convertBtnFile = document.getElementById("convert-btn-file");

  var loaderContainer = document.getElementById("loader-container");

  const themeSelector = document.getElementById('theme-select');

  const editorHeader = document.getElementById('editor-header');

  var editorComponent = document.getElementById("editor");
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/xcode");
  editor.session.setMode("ace/mode/html");

  upload.onclick = () => {
    popup.style.display = "none";
    canvas.style.display = "block";
    var el = document.createElement("input");
    el.setAttribute("type", "file");
    el.click();

    el.addEventListener("change", handleImage);
    convertBtnFile.style.display = "block";
  };

  convertBtnFile.addEventListener("click", () => {
    loaderContainer.style.display = "block";
    new TypeIt("#loader-text", {
      speed: 50,
      startDelay: 0
    })
      .type("Initialising Neural Network...")
      .pause(250)
      .delete()
      .pause(250)
      .type("Optimizing components...")
      .delete()
      .pause(100)
      .type("Generating Markup...")
      .go();

    console.log("converting image");
    var data_uri = canvas.toDataURL();
    var theme = themeSelector.options[themeSelector.selectedIndex].value;
    var obj = {
      "style": theme,
      "imageData": data_uri
    };
    $.ajax({
      url: "http://10.100.92.32:5000/convertSketch",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      method: "POST",
      dataType: "html",
      contentType: "application/json",
      data: JSON.stringify(obj),
      success: function (obj) {
        loaderContainer.style.display = "none";
        console.log("succes: " + obj);
        canvas.style.width = "49%";
        canvas.style.top = "15%";
        canvas.style.margin = "10px 0";
        convertBtnFile.style.display = "none";
        editorComponent.style.display = "block";
        editor.setValue(obj);
        editorHeader.style.display = 'block'
        var opened = window.open("");
        opened.document.write(obj);
      }
    });
  });

  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});
