/**
 * Utilitas untuk mengelola crop, posisi fokus (pan), dan zoom ukuran foto galeri NMYC.
 * Kompatibel dengan format JSON baru { x, y, scale } dan format lama ("center 15%").
 */

/**
 * Konversi nilai slider (0% - 200%, default tengah 100%) ke nilai CSS scale (0.5 - 2.0, default 1.0)
 */
export function sliderToScale(val) {
  const num = typeof val === 'number' ? val : parseFloat(val)
  const v = isNaN(num) ? 100 : Math.max(0, Math.min(200, num))
  if (v <= 100) {
    return Number((0.5 + (v / 100) * 0.5).toFixed(2))
  } else {
    return Number((1.0 + ((v - 100) / 100) * 1.0).toFixed(2))
  }
}

/**
 * Konversi nilai CSS scale (0.5 - 2.0) kembali ke nilai slider (0 - 200)
 */
export function scaleToSlider(scale) {
  const num = typeof scale === 'number' ? scale : parseFloat(scale)
  const s = isNaN(num) ? 1.0 : Math.max(0.5, Math.min(2.0, num))
  if (s <= 1.0) {
    return Math.round(((s - 0.5) / 0.5) * 100)
  } else {
    return Math.round(100 + ((s - 1.0) / 1.0) * 100)
  }
}

export function parseImageCrop(value) {
  if (!value) {
    return { x: 50, y: 50, scale: 1 }
  }

  // Jika sudah berupa objek
  if (typeof value === 'object' && value !== null) {
    return {
      x: typeof value.x === 'number' ? Math.round(value.x) : 50,
      y: typeof value.y === 'number' ? Math.round(value.y) : 50,
      scale: typeof value.scale === 'number' ? Number(Math.max(0.5, Math.min(2.5, value.scale)).toFixed(2)) : 1
    }
  }

  const str = String(value).trim()

  // Format JSON baru: {"x":50,"y":15,"scale":1.2}
  if (str.startsWith('{')) {
    try {
      const parsed = JSON.parse(str)
      return {
        x: typeof parsed.x === 'number' ? Math.round(parsed.x) : 50,
        y: typeof parsed.y === 'number' ? Math.round(parsed.y) : 50,
        scale: typeof parsed.scale === 'number' ? Number(Math.max(0.5, Math.min(2.5, parsed.scale)).toFixed(2)) : 1
      }
    } catch {
      return { x: 50, y: 50, scale: 1 }
    }
  }

  // Format lama: "center 15%" atau "50% 15%"
  const match = str.match(/(\d+)%/)
  if (match) {
    return { x: 50, y: parseInt(match[1], 10), scale: 1 }
  }

  if (str === 'top') return { x: 50, y: 15, scale: 1 }
  if (str === 'bottom') return { x: 50, y: 85, scale: 1 }

  return { x: 50, y: 50, scale: 1 }
}

export function stringifyImageCrop(crop) {
  const x = Math.round(Math.max(-20, Math.min(120, crop.x ?? 50)))
  const y = Math.round(Math.max(-20, Math.min(120, crop.y ?? 50)))
  const scale = Number(Math.max(0.5, Math.min(2.5, crop.scale ?? 1)).toFixed(2))

  return JSON.stringify({ x, y, scale })
}

export function getImageCropStyle(value, isFullView = false) {
  if (isFullView) {
    return {
      objectFit: 'contain',
      objectPosition: 'center',
      transform: 'none'
    }
  }

  const crop = parseImageCrop(value)
  const style = {
    objectFit: 'cover',
    objectPosition: `${crop.x}% ${crop.y}%`
  }

  if (crop.scale && crop.scale !== 1) {
    style.transform = `scale(${crop.scale})`
    style.transformOrigin = `${crop.x}% ${crop.y}%`
  }

  return style
}

