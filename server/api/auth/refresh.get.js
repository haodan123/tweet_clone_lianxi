import { sendError } from "h3"
import { getRefreshTokenByToken } from "../../db/refreshTokens.js"
import { decodeRefreshToken, generateTokens } from "../../utils/jwt.js"
import { getUserById } from "../../db/users.js"

export default defineEventHandler(async (event) => {
    const cookies = useCookies(event)

    const refreshToken = cookies.refresh_token

    //如果没有获取到刷新的token 报错401
    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }
    // 把user 和token合到一块
    const rToken = await getRefreshTokenByToken(refreshToken)
    // 判断有没有获取到信息
    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const token = decodeRefreshToken(refreshToken)

    try {
        const user = await getUserById(token.userId)

        const { accessToken } = generateTokens(user)

        return { access_token: accessToken }

    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
});