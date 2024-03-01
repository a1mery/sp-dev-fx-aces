import {
  BaseComponentsCardView,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ComponentsCardViewParameters,
  ImageCardView
} from '@microsoft/sp-adaptive-card-extension-base';
import { Page } from '../../types';
import { IMostLikedPagesAdaptiveCardExtensionProps, IMostLikedPagesAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MostLikedPagesAdaptiveCardExtension';
import * as strings from 'MostLikedPagesAdaptiveCardExtensionStrings';

export class CardView extends BaseComponentsCardView<IMostLikedPagesAdaptiveCardExtensionProps, IMostLikedPagesAdaptiveCardExtensionState, ComponentsCardViewParameters> {
  /**
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   */

  public get cardViewParameters(): ComponentsCardViewParameters {
    if (this.state.pages.length > 0) {
      const mostLikedPage: Page = this.state.pages[0];
      return ImageCardView({
        cardBar: {
          componentName: 'cardBar',
          title: this.properties.title
        },
        image: {
          url: mostLikedPage.thumbnailWebUrl
        },
        header: {
          componentName: 'text',
          text: "The most liked page is " + mostLikedPage.title + " with " + mostLikedPage.reactions.likeCount + " likes"
        },
        footer: {
          componentName: 'cardButton',
          title: 'quickViewButton',
          action: {
            type: 'QuickView',
            parameters: {
              view: QUICK_VIEW_REGISTRY_ID
            },
          }
        }
      });
    } else {
      return ImageCardView({
        cardBar: {
          componentName: 'cardBar',
          title: this.properties.title
        },
        image: {
          url: require('./../assets/MicrosoftLogo.png')
        },
        header: {
          componentName: 'text',
          text: "No liked page found. Try to change the source in the property pane."
        },
        footer: {
          componentName: 'cardButton',
          title: strings.QuickViewButton,
          action: {
            type: 'QuickView',
            parameters: {
              view: QUICK_VIEW_REGISTRY_ID
            },
          }
        }
      });
    }

  }
  // public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
  //   return [
  //     {
  //       title: strings.QuickViewButton,
  //       action: {
  //         type: 'QuickView',
  //         parameters: {
  //           view: QUICK_VIEW_REGISTRY_ID
  //         },
  //       }
  //     }
  //   ];
  // }

  // public get data(): IImageCardParameters {
  //   if (this.state.pages.length > 0) {

  //     const mostLikedPage: Page = this.state.pages[0];
  //     return {
  //       primaryText: "The most liked page is " + mostLikedPage.title + " with " + mostLikedPage.reactions.likeCount + " likes",
  //       imageUrl: mostLikedPage.thumbnailWebUrl,
  //       title: this.properties.title
  //     };

  //   } else {
  //     return {
  //       primaryText: "No liked page found. Try to change the source in the property pane.",
  //       imageUrl: require('./../assets/MicrosoftLogo.png'),
  //       title: this.properties.title
  //     };
  //   }
  // }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    if (this.state.pages.length > 0) {

      return {
        type: 'ExternalLink',
        parameters: {
          target: this.state.pages[0].webUrl
        }
      };

    } else {
      return {
        type: 'ExternalLink',
        parameters: {
          target: "https://github.com/"
        }
      };
    }
  }
}
