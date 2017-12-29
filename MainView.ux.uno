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
			Fuse.UniSign.API.SetLicense("ikdt8CleK1HVv3Qa0temFA==");
			Fuse.UniSign.API.SetLicense("ikdt8CleK1HVv3Qa0temFA==");
			Fuse.UniSign.API.SetLicense("ikdt8CleK1HVv3Qa0temFA==");
		}

		InitializeUX();
	}
}
