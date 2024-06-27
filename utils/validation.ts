const dateValidationPattern = /\d\d\.\d\d\.\d\d\d\d/

export const validateDate = (value: string) => {
    const dateValue = new Date(value)

    return !(
        !dateValidationPattern.test(value) ||
        isNaN(dateValue.getTime()) ||
        new Date().getTime() < dateValue.getTime()
    )
}
