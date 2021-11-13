document.getElementById("btn").addEventListener("click", async() => {
    var link = document.querySelector("#tiktok").value;
    var res = await fetch("/", {
        method: "POST",
        body: JSON.stringify({
            tiktok: link
        })
    });
    const alert = document.createElement("div");
    alert.role = "alert";
    switch(res.status) {
        case 200:
        case 203:
            var link = (await res.json()).link;

            alert.className = "alert alert-success text-center";
            alert.innerText = "La vidéo à été récupérée."
            document.querySelector("#container").innerHTML = "";
            document.querySelector("#container").appendChild(alert);
        //<textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
            const textaera = document.createElement("textarea");
            textaera.className ="form-control";
            textaera.innerText = link;
            document.querySelector("#container").appendChild(textaera);
            const dgripgap = document.createElement("div");
            dgripgap.className = "d-grid gap mt-2"
            const btn = document.createElement("button");
            dgripgap.appendChild(btn);
            document.querySelector("#container").appendChild(dgripgap);
            btn.className = "btn btn-primary";
            btn.innerText = "Prendre une autre vidéo";
            btn.onclick = () => window.location = "index.html"
            break;
        default:
            document.querySelector("#container").innerHTML = "";

            alert.className = "alert alert-danger";
            alert.innerText = (await res.json()).message;
            document.querySelector("#container").appendChild(alert);
            break;
        case 400:
            document.querySelector("#container").innerHTML = "";
            alert.className = "alert alert-danger";
            alert.innerText = (await res.json()).message || "An error occured";
            document.querySelector("#container").appendChild(alert);
            break;
    }
});