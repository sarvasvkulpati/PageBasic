document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  const draw = document.getElementById("draw");
  const upload = document.getElementById("upload");

  draw.onclick = () => {
    window.location = "draw.html";
  };

  upload.onclick = () => {
    window.location = "upload.html";
  };
});
// var el = document.createElement("input");
// el.setAttribute("type", "file");
// el.click();

// el.addEventListener("change", e => {
//   var canvas = document.createElement("canvas");
//   var data_uri = canvas.toDataURL(e.target.files[0]);
//   console.log(data_uri);

//   $.ajax({
//     url: "http://10.100.44.239:5000/convertSketch",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json"
//     },
//     method: "POST",
//     dataType: "html",
//     contentType: "text/plain",
//     data: data_uri,
//     success: function(data) {
//       console.log("succes: " + data);
//       var opened = window.open("");
//       opened.document.write(data);
//     }
//   });
// });
