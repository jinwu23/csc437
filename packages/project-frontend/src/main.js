import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <p class="mt-8 ml-8">
      Hello World!
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
