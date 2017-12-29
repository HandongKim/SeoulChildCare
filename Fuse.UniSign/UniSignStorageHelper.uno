/*
using Uno;
using Uno.Collections;
using Fuse;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign
{
	public static class StorageHelper
	{
		extern(ANDROID) public static string GetStorageDirectory()
		{
			return GetExternalFilesDirectory() ??
				GetFilesDirectory();
		}

		extern(!ANDROID) public static string GetStorageDirectory()
		{
			return "";
		}

		[Foreign(Language.Java)]
		extern(ANDROID) static string GetExternalFilesDirectory()
		@{
			return com.fuse.Activity.getRootActivity().getExternalFilesDir(null).getAbsolutePath();
		@}


		[Foreign(Language.Java)]
		extern(ANDROID) static string GetFilesDirectory()
		@{
			return com.fuse.Activity.getRootActivity().getFilesDir().getAbsolutePath();
		@}
	}
}

*/

using Uno;
using Uno.Collections;
using Fuse;
using Uno.Compiler.ExportTargetInterop;

namespace Fuse.UniSign
{
    public static class StorageHelper
    {
        extern(ANDROID) public static string GetStorageDirectory()
        {
            return GetExternalFilesDirectory() ??
                GetFilesDirectory();
        }

        extern(!ANDROID) public static string GetStorageDirectory()
        {
            return "";
        }

        [Foreign(Language.Java)]
        extern(ANDROID) static string GetExternalFilesDirectory()
        @{
            //return com.fuse.Activity.getRootActivity().getExternalFilesDir(null).getAbsolutePath();
            return android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
        @}


        [Foreign(Language.Java)]
        extern(ANDROID) static string GetFilesDirectory()
        @{
            //return com.fuse.Activity.getRootActivity().getFilesDir().getAbsolutePath();
            return android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
        @}
    }
}