const fetchData = async () => {
    const response = await fetch("http://localhost:5000/test");
    console.log(await response.text());
}
fetchData();