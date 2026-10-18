console.log("JavaScript is working!");
window.addEventListener("load", async () => {
            await MathJax.startup.promise;
            await MathJax.typesetPromise();
        });

function toggleTheme() {
    document.body.classList.toggle("dark");
}