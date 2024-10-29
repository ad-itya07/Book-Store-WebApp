function getImageUrl () {
    return new URL(`../assets/avatar.png` , import.meta.url)
}

export {getImageUrl}