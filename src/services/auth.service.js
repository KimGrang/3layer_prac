import jwtwebToken from 'jsonwebtoken';
import userRepository from '../repository/user.repository';

class AuthService {
    async verifyFreshToken(refreshToken) {
        const token = jwtwebToken.verify(refreshToken, 'resume&%*');
        if (!token.userId) {
            throw {
                code: 401,
                message: 'Your information is not correct.'
            };
        }

        const user = await userRepository.findOneUserByUserId(token.userId);

        if (!user) {
            throw {
                code: 401,
                message: 'Your information is not correct.'
            };
        }

        // freshToken valid -> accessToken, refreshToken 재발급
        const newAccessToken = jwtwebToken.sign({ userId: user.userId }, 'resume@#', { expiresIn: '12h' });
        const newRefreshToken = jwtwebToken.sign({ userId: user.userId }, 'resume&%*', { expiresIn: '7d' });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
}

const authService = new AuthService();
export default authService;