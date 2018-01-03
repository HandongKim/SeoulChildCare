using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;

namespace Fuse.UniSign
{
	[UXGlobalModule]
	public class ValueFactoryUX : NativeModule
	{
		static ValueFactoryUX _instance;

		public ValueFactoryUX() {
			if(_instance != null) return;
			Resource.SetGlobalKey(_instance = this, "ValueFactory");
			AddMember(new NativeFunction("setInfoJson", (NativeCallback)setInfoJson));
			AddMember(new NativeFunction("getInfoJson", (NativeCallback)getInfoJson));
		}

		object setInfoJson(Context context, object[] args)
		{
			var infoJson = ((IEnumerable<object>)args).FirstOrDefault() as string;
			if (infoJson == null) {
				throw new Error("Requires infoJSON as first argument");
			}
			debug_log(infoJson);
			ValueFactory.GetInstance().setInfoJson(infoJson);
			return null;
		}

		object getInfoJson(Context context, object[] args)
		{
			debug_log("---------------");
			return ValueFactory.GetInstance().getInfoJson();
			//return null;
		}
	}
}