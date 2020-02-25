//utility functions for react Views

export function errorChecker(name: string, errors: any, serverError: any): boolean {
    return (!!errors[name] || `${name}` in serverError);
}


export function errorText(name: string, errors: any, serverError: any): string {
    return ((!!errors[name] && errors[name].message )|| (`${name}` in serverError && serverError[name]));
}