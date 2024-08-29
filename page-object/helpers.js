export const isDesktopViewport = (page) => {
    const viewport = page.viewportSize()
    return viewport.width > 767
}