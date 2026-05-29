// Each algorithm returns an array of "frames".
// frame = { array: number[], comparing: number[], swapping: number[], sorted: number[] }

function snapshot(array, { comparing = [], swapping = [], sorted = [] } = {}) {
  return {
    array: [...array],
    comparing,
    swapping,
    sorted: [...sorted],
  }
}

export function bubbleSort(input) {
  const arr = [...input]
  const frames = []
  const n = arr.length
  const sorted = []
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      frames.push(snapshot(arr, { comparing: [j, j + 1], sorted }))
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        frames.push(snapshot(arr, { swapping: [j, j + 1], sorted }))
      }
    }
    sorted.unshift(n - 1 - i)
  }
  sorted.unshift(0)
  frames.push(snapshot(arr, { sorted: Array.from({ length: n }, (_, k) => k) }))
  return frames
}

export function selectionSort(input) {
  const arr = [...input]
  const frames = []
  const n = arr.length
  const sorted = []
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      frames.push(snapshot(arr, { comparing: [min, j], sorted }))
      if (arr[j] < arr[min]) min = j
    }
    if (min !== i) {
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
      frames.push(snapshot(arr, { swapping: [i, min], sorted }))
    }
    sorted.push(i)
  }
  frames.push(snapshot(arr, { sorted: Array.from({ length: n }, (_, k) => k) }))
  return frames
}

export function insertionSort(input) {
  const arr = [...input]
  const frames = []
  const n = arr.length
  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0) {
      frames.push(snapshot(arr, { comparing: [j - 1, j] }))
      if (arr[j - 1] > arr[j]) {
        ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
        frames.push(snapshot(arr, { swapping: [j - 1, j] }))
        j--
      } else {
        break
      }
    }
  }
  frames.push(snapshot(arr, { sorted: Array.from({ length: n }, (_, k) => k) }))
  return frames
}

export function quickSort(input) {
  const arr = [...input]
  const frames = []
  const sorted = []

  function qs(low, high) {
    if (low >= high) {
      if (low === high) sorted.push(low)
      return
    }
    const pivot = arr[high]
    let i = low
    for (let j = low; j < high; j++) {
      frames.push(snapshot(arr, { comparing: [j, high], sorted }))
      if (arr[j] < pivot) {
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          frames.push(snapshot(arr, { swapping: [i, j], sorted }))
        }
        i++
      }
    }
    if (i !== high) {
      ;[arr[i], arr[high]] = [arr[high], arr[i]]
      frames.push(snapshot(arr, { swapping: [i, high], sorted }))
    }
    sorted.push(i)
    qs(low, i - 1)
    qs(i + 1, high)
  }

  qs(0, arr.length - 1)
  frames.push(snapshot(arr, { sorted: Array.from({ length: arr.length }, (_, k) => k) }))
  return frames
}

export function mergeSort(input) {
  const arr = [...input]
  const frames = []
  const n = arr.length

  function merge(low, mid, high) {
    const left = arr.slice(low, mid + 1)
    const right = arr.slice(mid + 1, high + 1)
    let i = 0
    let j = 0
    let k = low
    while (i < left.length && j < right.length) {
      frames.push(snapshot(arr, { comparing: [low + i, mid + 1 + j] }))
      if (left[i] <= right[j]) {
        arr[k] = left[i]
        i++
      } else {
        arr[k] = right[j]
        j++
      }
      frames.push(snapshot(arr, { swapping: [k] }))
      k++
    }
    while (i < left.length) {
      arr[k] = left[i]
      frames.push(snapshot(arr, { swapping: [k] }))
      i++
      k++
    }
    while (j < right.length) {
      arr[k] = right[j]
      frames.push(snapshot(arr, { swapping: [k] }))
      j++
      k++
    }
  }

  function ms(low, high) {
    if (low >= high) return
    const mid = Math.floor((low + high) / 2)
    ms(low, mid)
    ms(mid + 1, high)
    merge(low, mid, high)
  }

  ms(0, n - 1)
  frames.push(snapshot(arr, { sorted: Array.from({ length: n }, (_, k) => k) }))
  return frames
}

export const ALGORITHMS = {
  bubble: { label: 'Bubble Sort', fn: bubbleSort, complexity: 'O(n²)' },
  selection: { label: 'Selection Sort', fn: selectionSort, complexity: 'O(n²)' },
  insertion: { label: 'Insertion Sort', fn: insertionSort, complexity: 'O(n²)' },
  quick: { label: 'Quick Sort', fn: quickSort, complexity: 'O(n log n)' },
  merge: { label: 'Merge Sort', fn: mergeSort, complexity: 'O(n log n)' },
}
