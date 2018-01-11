using Uno;
using Fuse.Scripting;
using Fuse.Reactive;
using Uno.Threading;
using Uno.Net.Http;
using Uno.IO;
using Uno.Text;
using Uno.Collections;

public class Uploader : NativeModule
{
    public Uploader()
    {
        AddMember(new NativePromise<string, string>("send", (FutureFactory<string>)send, null));
    }

    static Future<string> send(object[] args)
    {
        debug_log "uploader started";
        // file path
        var path = (string)args[0];
        //debug_log path;
        debug_log("Path : " + path);

        // uri where the image should be uploaded
        var uri = (string)args[1];
        debug_log uri;
        var fileName = Path.GetFileName(path);
        debug_log fileName;
        var fileExt = Path.GetExtension(path).ToLower();
        debug_log fileExt;

        var dsParam = (string) args[2];
        var dsSearch = (string) args [3];

        var GVMEMCODE = (string) args[4];
        var ATCHMNFL_YM = (string) args[5];
        var FILE_SE = (string) args[6];
        var DOWN_LVL = (string) args[7];

        //debug_log param;
        debug_log("Uploader dsParam : " + dsParam);
        debug_log("Uploader dsSearch : " + dsSearch);

        debug_log("Uploader gvmemcode : " + GVMEMCODE);
        debug_log("Uploader ATCHMNFL_YM : " + ATCHMNFL_YM);
        debug_log("Uploader FILE_SE : " + FILE_SE);
        debug_log("Uploader DOWN_LVL : " + DOWN_LVL);




        var imageData = Uno.IO.File.ReadAllBytes(path);
        var fileType = "image/png";
        if (fileExt == ".jpg" || fileExt == ".jpeg")
        {
          fileType = "image/jpeg";
        }
        else if (fileExt == ".gif")
        {
          fileType = "image/gif";
        }
        debug_log fileType;
        debug_log "all details listed";

        Dictionary<string, string> headers = new Dictionary<string, string>();
        // add any custom headers needed by your API 

        Dictionary<string, object> postParameters = new Dictionary<string, object>();
        postParameters.Add("filename", fileName);
        postParameters.Add("fileformat", fileExt);
        postParameters.Add("dsParam", dsParam);
        postParameters.Add("dsSearch", dsSearch);
        postParameters.Add("GVMEMCODE", GVMEMCODE);
        postParameters.Add("ATCHMNFL_YM", ATCHMNFL_YM);
        postParameters.Add("FILE_SE", FILE_SE);
        postParameters.Add("DOWN_LVL", DOWN_LVL);
        //postParameters.Add("file", new FormUpload.FileParameter(imageData, fileName, fileType, dsParam, dsSearch));
        postParameters.Add("file", new FormUpload.FileParameter(imageData, fileName, fileType, dsParam, dsSearch, GVMEMCODE, ATCHMNFL_YM, FILE_SE, DOWN_LVL));

        // if there are multiple files, then simply add multiple post parameters. I didn't test it though, but it should work.

        debug_log "post parameters prepared";
        byte[] formData = null;
        var request = FormUpload.MultipartFormDataPost(uri, "POST", headers, postParameters, out formData);

        debug_log "request created";

        var promise = new Promise<string>();
        new ResultClosure(promise, request);
        debug_log "about to send async request";
        request.SendAsync(formData);

        return promise;
    }

    class ResultClosure
    {
        Promise<string> _promise;

        public ResultClosure(Promise<string> promise, HttpMessageHandlerRequest request)
        {
            _promise = promise;

            request.Done += Done;
            request.Aborted += Aborted;
            request.Error += Error;
            request.Timeout += Timeout;
        }

        void Done(HttpMessageHandlerRequest r) {
          _promise.Resolve(r.GetResponseContentString());
        }

        void Error(HttpMessageHandlerRequest r, string message) { _promise.Reject(new Exception(message)); }

        void Aborted(HttpMessageHandlerRequest r) { _promise.Reject(new Exception("Aborted")); }

        void Timeout(HttpMessageHandlerRequest r) { _promise.Reject(new Exception("Timeout")); }
    }
}

// Implements multipart/form-data POST in C# http://www.ietf.org/rfc/rfc2388.txt
// http://www.briangrinstead.com/blog/multipart-form-post-in-c
// Following code is a modification from the code posted at the above URL.
public static class FormUpload
{
    private static readonly Encoding encoding = Encoding.UTF8;
    public static HttpMessageHandlerRequest MultipartFormDataPost(string postUrl, string postMethod, Dictionary<string,string> headers, Dictionary<string, object> postParameters, out byte[] formData)
    {
        string formDataBoundary = String.Format("SpecificString");
        string contentType = "multipart/form-data; boundary=" + formDataBoundary;
        debug_log "about to request multipart data";
        formData = GetMultipartFormData(postParameters, formDataBoundary);
        debug_log "multi-part data received";
        return PostForm(postUrl, postMethod, contentType, headers, formData);
    }
    private static HttpMessageHandlerRequest PostForm(string postUrl, string postMethod, string contentType, Dictionary<string,string> headers, byte[] formData)
    {
        var client = new HttpMessageHandler();
        HttpMessageHandlerRequest request = client.CreateRequest(postMethod, postUrl);
        if (request == null)
        {
          debug_log "oops no request";
          return request;
            //throw new NullReferenceException("request is not a http request");
        }
        debug_log "request created";

        foreach (var header in headers) {
          request.SetHeader(header.Key, header.Value);
        }

        // Set up the request properties.
        //request.Method = "POST";
        //request.SetHeader("Content-Type", "multipart/form-data");
        request.SetHeader("Content-Type", contentType);
        //request.ContentType = contentType;
        //request.UserAgent = userAgent;
        //request.CookieContainer = new CookieContainer();
        request.SetHeader("Content-Length", formData.Length.ToString());

        debug_log "length set to " + formData.Length.ToString();

        //request.ContentLength = formData.Length;

        // You could add authentication here as well if needed:
        // request.PreAuthenticate = true;
        // request.AuthenticationLevel = System.Net.Security.AuthenticationLevel.MutualAuthRequested;
        // request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(System.Text.Encoding.Default.GetBytes("username" + ":" + "password")));

        return request;
    }

    private static byte[] GetMultipartFormData(Dictionary<string, object> postParameters, string boundary)
    {
        Stream formDataStream = new Uno.IO.MemoryStream();
        //bool needsCLRF = false;
        int count = 1;

         String filename = postParameters["filename"].ToString();
         debug_log("2018.01.11 filename : " + filename);


        foreach (var param in postParameters)
        {
            // Thanks to feedback from commenters, add a CRLF to allow multiple parameters to be added.
            // Skip it on the first parameter, add it to subsequent parameters.
            debug_log("postParameters : " + postParameters.Count);

            debug_log("for each param : " + param.Key);
            
            //첫번째 파라미터값이 넘어가기전에, 시작을 여는 Boundary 셋팅
            if (count ==  1) {
                string starter = string.Format("\r\n--{0}\r\n",  boundary);
                var bytes = Utf8.GetBytes(starter);
                formDataStream.Write(bytes, 0, bytes.Length);
            }

            debug_log("formDataStream : " + formDataStream);

            if (param.Value is FileParameter)
            {
                FileParameter fileToUpload = (FileParameter)param.Value;

                // Add just the first part of this param, since we will write the file data directly to the Stream
                string header = string.Format("--{0}\r\nContent-Disposition: form-data; name=\"{1}\"; filename=\"{2}\"\r\nContent-Type: {3}\r\n\r\n",
                    // boundary,
                    //param.Key,
                    // fileToUpload.FileName ?? param.Key,
                    //fileToUpload.ContentType ?? "application/octet-stream");

                    boundary,
                    "profile_photo",
                    filename,
                    //fileToUpload.FileName ?? param.Key,
                    "application/octet-stream");


                debug_log("param.Value : " + param.Value);

                debug_log("Uploader.uno string header : " + header);


                var bytes = Utf8.GetBytes(header);

                formDataStream.Write(bytes, 0, bytes.Length);

                // Write the file data directly to the Stream, rather than serializing it to a string.
                formDataStream.Write(fileToUpload.File, 0, fileToUpload.File.Length);
            }
            else
            {
                string postData = string.Format("--{0}\r\nContent-Disposition: form-data; name=\"{1}\"\r\n\r\n{2}",
                    boundary,
                    param.Key,
                    param.Value);

                debug_log("Uploader.uno string postData : " + postData);


                    var bytes = Utf8.GetBytes(postData);
                formDataStream.Write(bytes, 0, bytes.Length);
            }

            //각 파라미터간의 구분을 해주기 위한 Boundary 셋팅
            if (count < postParameters.Count) {
                 string starter = string.Format("\r\n--{0}\r\n",  boundary);
                var bytes = Utf8.GetBytes(starter);
                formDataStream.Write(bytes, 0, bytes.Length);
            }

           count++;
           debug_log("counted number : " + count);
        }

        // Add the end of the request.  Start with a newline
        //마지막 파라미터값이 넘어가기전에, 닫아주는 Boundary 셋팅
        string footer = "\r\n--" + boundary + "--\r\n";
        var fbytes = Utf8.GetBytes(footer);
        formDataStream.Write(fbytes, 0, fbytes.Length);

        // Dump the Stream into a byte[]
        formDataStream.Position = 0;
        byte[] formData = new byte[(int)formDataStream.Length];
        formDataStream.Read(formData, 0, formData.Length);
        formDataStream.Close();


        debug_log("formData : " + formData);
        return formData;
    }

    public class FileParameter
    {
        public byte[] File { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string dsParam {get; set;}
        public string dsSearch {get; set;}
        public string gvmemcode {get; set;}
        public string atchmnfl_yn {get;set;}
        public string file_se {get; set;}
        public string down_lvl {get; set;}
        public FileParameter(byte[] file) : this(file, null) { }
        public FileParameter(byte[] file, string filename) : this(file, filename, null) { }
        public FileParameter(byte[] file, string filename, string contenttype)
        {
            File = file;
            FileName = FileName;
            ContentType = contenttype;
        }

        public FileParameter(byte[] file, string filename, string contentype, string dsparam, string dssearch, string GVMEMCODE,  string ATCHMNFL_YM, string FILE_SE, string DOWN_LVL) 
        {
            File = file;
            FileName = FileName;
            ContentType = contentype;
            dsParam = dsparam;
            dsSearch = dssearch;
            gvmemcode = GVMEMCODE;
            atchmnfl_yn = ATCHMNFL_YM;
            file_se = FILE_SE;
            down_lvl = DOWN_LVL;

        }



    }
}