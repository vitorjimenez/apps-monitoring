const axios = require('axios');
const { sendDiscordNotification } = require('../services/webhooks');

jest.mock('axios');

describe('sendDiscordNotification', () => {

    afterEach(() => {
        axios.post.mockReset();
    });

    it('should send a notification to Discord', async () => {
        const error = new Error("This is a test error");
        error.stack = "Error: This is a test error\n at Object.<anonymous> (path/to/file.js:10:10)";
        error.method = 'GET';
        error.url = '/test-endpoint';

        axios.post.mockResolvedValue({ status: 200 });

        await sendDiscordNotification(error);

        expect(axios.post).toHaveBeenCalled();
    });

    it('should handle errors from axios', async () => {
        const error = new Error("This is a test error");
        error.stack = "Error: This is a test error\n at Object.<anonymous> (path/to/file.js:10:10)";
        error.method = 'GET';
        error.url = '/test-endpoint';

        axios.post.mockRejectedValue(new Error('Failed to post to Discord'));

        await sendDiscordNotification(error);

        expect(axios.post).toHaveBeenCalled();
    });
});
