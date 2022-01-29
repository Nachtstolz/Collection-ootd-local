const jwtMiddleware = require("../../../config/jwtMiddleware");
const calendarProvider = require("./calendarProvider");
const calendarService = require("./calendarService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
/*
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    // JWT는 이 후 주차에 다룰 내용
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await calendarService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};
*/
/**
 * API No. 6
 * API Name : Monthly 달력 OOTD 부르기
 * [GET] /app/calendar/monthly/:userIdx
 * path variable : userIdx
 * jwt : userIdx
 */
exports.getMonth = async function (req, res) {

    const userIdxFromJWT = req.verifiedToken.userIdx;

    const userIdx = req.params.userIdx;
    
    if(userIdxFromJWT != userIdx) {
        return res.send(errResponse(baseResponse.USERID_NOT_MATCH));
    } else {
        const callMonthCalOotd = await calendarProvider.retrieveMonthlyList(userIdx);
        return res.send(response(baseResponse.SUCCESS, callMonthCalOotd));
    }

}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */

/*
exports.postUsers = async function (req, res) {

    const {email, password, nickname} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await calendarService.createUser(
        email,
        password,
        nickname
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};
*/

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
/*
exports.getWeek = async function (req, res) {


    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await calendarProvider.retrieveUserList();
        // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 userListResult 호출
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 아메일을 통한 유저 검색 조회
        const userListByEmail = await calendarProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};
*/

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getWeek = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    // errResponse 전달
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // userId를 통한 유저 검색 함수 호출 및 결과 저장
    const userByUserId = await calendarProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
/*
exports.login = async function (req, res) {

    const {email, password} = req.body;

    const signInResponse = await calendarService.postSignIn(email, password);

    return res.send(signInResponse);
};
*/

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
/*
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    // JWT는 이 후 주차에 다룰 내용
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await calendarService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};
*/


// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
/*
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
*/