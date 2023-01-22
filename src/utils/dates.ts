function getDateString(value: string): string {
    return new Date(value).toString();
}

function getDateParamList(value: string): string[] {
    return value.split(' ');
}

function getArticleDate(value: string[]): string {
    return `${value[2]} ${value[1]} ${value[3]}`;
}

export function getParsedDate(value: string): string {
    const dateString = getDateString(value);
    const dateSplitted = getDateParamList(dateString);

    return getArticleDate(dateSplitted);
}