import { Component } from '@angular/core';
import { MetaTagsService } from 'src/app/shared/service/meta-tags.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private metaService: MetaTagsService) {}

  ngOnInit(): void {
    const meta = {
      title: 'Contact Us | Quick Blogs - Get in Touch with Our Team',
      description: 'Have questions or feedback? Contact Quick Blogs today! Our dedicated team is here to assist you. Reach out for inquiries, collaborations, or support',
      keywords: 'Contact Us, Quick Blogs, Get in Touch, Contact Information, Customer Support, Inquiry, Collaboration, Feedback, Reach Out, Contact Quick Blogs',
    }
   
  }
}
