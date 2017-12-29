/*----------------------------------------------------------------------------------
 * PROJ : CrossCert Project CrossCertificattion System
 * NAME : CertListAdapter
 * DESC : 인증서리스트를 위한 custom Adapter
 * AUTHOR : 김정수
 * VER : v1.0
 * 
 * ----------------------------------------------------------------------------------*/

package com.crosscert.sample.shared;
  
import java.util.List;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.crosscert.android.core.Cert;
import com.crosscert.android.core.CertUtil;
import com.crosscert.sample.R;
/**
 * 인증서리스트를 위한 custom Adapter
 * 
 */
public class CertListAdapter extends BaseAdapter {
 
   
    private final Context context;
    private final List<Cert> certificates;
    
    public CertListAdapter(Context context, List<Cert> certificates) {
        this.context = context;
        this.certificates = certificates;
    }

    public int getCount() { 
        return this.certificates.size();
    }

    public Object getItem(int position) {
        return this.certificates.get(position);
    } 

    public long getItemId(int position) {
        return position;
    }

    public View getView(int position, View convertView, ViewGroup parent) {
    	Cert certificate = this.certificates.get(position);
        return new ImageListView(this.context, certificate);
    }
    
    /**
     * 리스트의 각 뷰를 그린다
     * 
     */ 
    private final class ImageListView extends RelativeLayout{
    	
        private TextView typeText;
        private TextView issuerText;
        private TextView userText;
        private TextView expirationDateText;
        
        /**
    	 *  ImageListView 생성자 
    	 *  @param context:현재 컨텍스트
    	 *  @param cert: 인증서 객체 Cert
    	 *  
    	 */
        public ImageListView(Context context, Cert cert) {

            super(context);
 
            View.inflate(ImageListView.this.getContext(), R.layout.crosscert_sample_shared_certlistadapter, this);

            typeText   = (TextView)findViewById(R.id.typeText);
            issuerText   = (TextView)findViewById(R.id.issuerText);
            userText   = (TextView)findViewById(R.id.userText);
            expirationDateText   = (TextView)findViewById(R.id.expirationDateText);
            
            int expired = CertUtil.getExpiredType(
            			cert.getCertValidityNotBefore(), 
            			cert.getCertValidityNotAfter()
            );
            
            switch(expired) {
            case CertUtil.EXPIRED_ALREADY:
            	//iconView.setImageDrawable(getResources().getDrawable(R.drawable.crosscert_shared_certlistnokicon));
            	break;
            case CertUtil.EXPIRED_NEARLY:
            	//iconView.setImageDrawable(getResources().getDrawable(R.drawable.crosscert_shared_certlistnearlyicon));
            	break;
            case CertUtil.EXPIRED_NOT:
            default:
            	//iconView.setImageDrawable(getResources().getDrawable(R.drawable.crosscert_shared_certnormalimg));
            	break;
            }
            
            typeText.setText(CertUtil.getCertPolicyString(cert.getCertPolicy()));
            issuerText.setText(CertUtil.parseDN(cert.getSubjectDN(), "o"));
            userText.setText(CertUtil.parseDN(cert.getSubjectDN(), "cn"));     
            expirationDateText.setText(CertUtil.getDate(cert.getCertValidityNotAfter()));
           
        }
    	
    }
}
