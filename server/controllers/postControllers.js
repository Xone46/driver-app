exports.public = async (res, req, next) => {

    try {

        console.log('public')

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.private = async (res, req, next) => {

    
    try {

        console.log('private');

    } catch (error) {
        console.log(error);
        next(error);
    }

}