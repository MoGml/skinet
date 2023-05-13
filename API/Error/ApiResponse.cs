namespace API.Error
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }


        public int StatusCode { get; set; }

        public string? Message { get; set; }


        private string? GetDefaultMessageForStatusCode(int statusCode)
        {
            return StatusCode switch
            {
                400 => "Bad Request Ya Basha",
                404 => "NotFound Ya Basha",
                500 => "Server Error Ya Basha",
                _ => null
            };
        }
    }
}