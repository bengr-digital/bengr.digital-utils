/**
 * This function will copy some text into clipboard.
 *
 * @param text string
 */
export const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

/**
 * Navigate on element. Then it will find first focusable element inside. For keyboard only users.
 *
 * @param id this is HTML id
 */
export const navigate = (id?: string) => {
  const container = document.getElementById(id || '') || document.body

  const focusable = container.querySelectorAll('button, [href], input, [tabindex="0"]')

  const first = focusable[0] as HTMLElement
  if (first) first.focus()
}
