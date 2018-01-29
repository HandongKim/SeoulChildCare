using Uno;
using Uno.UX;
using Fuse.Scripting;
using Uno.Collections;
using Uno.Threading;

namespace Fuse.UniSign
{

	public class ValueFactory
	{
		private static ValueFactory instance = new ValueFactory();

		public static ValueFactory GetInstance() 
		{
			if(instance == null) {
				instance = new ValueFactory();
			}

			return instance;
		}

		private string infoJSON;

		public void setInfoJson(string infoJson) {
			this.infoJSON = infoJson;
		}

		public string getInfoJson() {
			return this.infoJSON;
		}
	}
}