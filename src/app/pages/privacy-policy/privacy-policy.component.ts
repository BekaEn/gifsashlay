import { Component } from '@angular/core';
import { MetaTagsService } from 'src/app/shared/service/meta-tags.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  constructor(private metatagService: MetaTagsService) {}

  ngOnInit() {
    const metaObject = {
      title: 'Privacy Policy | Gifs Ashlay - Your Trusted Source for Informative Content',
      description: 'Read our privacy policy to learn how we handle your personal information on Gifs Ashlay.',
      keywords: 'Privacy Policy, Gifs Ashlay, Online Privacy, Data Protection, Information Security, User Data, Data Privacy, Website Privacy, Trustworthy Content, Privacy Assuranc',
    }

    
  }
}
