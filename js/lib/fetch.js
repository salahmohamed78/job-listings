async function fetchData(req) {
  try {
    const res = await fetch(req);
    if (res.ok === false) {
      throw new Error("Internal http code error");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { fetchData };
