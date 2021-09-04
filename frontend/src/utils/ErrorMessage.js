export function parseErrorMessages(field_error_message) {
    //object -> key, value 분리 acc는 함수 -> python items()
    return Object.entries(field_error_message).reduce((acc, [field_name, errors]) => {
        //errors: ['str1', 'str2'].join(" ") => "m1 m2"
        // field_name => key, errors => value
        acc[field_name] = {
            validateStatus: "error",
            help: errors.join(" ")
        }
        return acc;
    }, {}) //누적의 초기화 값 빈 obj
}