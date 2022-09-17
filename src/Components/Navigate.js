export function NavigateTo(navigate, to) {
    var Page = document.getElementsByClassName("Page")[0];
    Page.style.opacity = 0;
    setTimeout(() => {
        navigate(to);
        Page.style.opacity = 1;
    }, 500)
}