window.random = list => {
    if (Array.isArray(list)) {
        return list[Math.floor(Math.random() * list.length)]
    } else if (Object.keys(list)) {
        return list[random(Object.keys(list))]
    }
}
