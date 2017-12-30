using Uno;
using Uno.Collections;
using Fuse;
using Fuse.UniSign;

public partial class MainView
{
	public MainView()
	{
		if defined(ANDROID)
		{
			// Execute several times
			Fuse.UniSign.API.SetLicense("fzgCFFYVf7f5WKSC0+wf+A==");
			Fuse.UniSign.API.SetLicense("fzgCFFYVf7f5WKSC0+wf+A==");
			Fuse.UniSign.API.SetLicense("fzgCFFYVf7f5WKSC0+wf+A==");
		}

		InitializeUX();
	}
}
