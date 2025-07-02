from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from form_submission.models import FormSession
from .models import PropertyFacilities


class SavePropertyFacilitiesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, session_id):
        """Fetch existing property facilities for a session"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)

            try:
                property_facilities = PropertyFacilities.objects.get(form_session=form_session)

                data = {
                    "basic": {
                        "air_conditioning": property_facilities.basic_air_conditioning,
                        "bathroom": property_facilities.basic_bathroom,
                        "dry_cleaning_services": property_facilities.basic_dry_cleaning_services,
                        "daily_housekeeping": property_facilities.basic_daily_housekeeping,
                        "intercom": property_facilities.basic_intercom,
                        "ironing_services": property_facilities.basic_ironing_services,
                        "lan": property_facilities.basic_lan,
                        "laundry": property_facilities.basic_laundry,
                        "newspaper": property_facilities.basic_newspaper,
                        "power_backup": property_facilities.basic_power_backup,
                        "parking": property_facilities.basic_parking,
                        "refrigerator": property_facilities.basic_refrigerator,
                        "microwave": property_facilities.basic_microwave,
                        "room_service": property_facilities.basic_room_service,
                        "smoke_detector": property_facilities.basic_smoke_detector,
                        "smoking_rooms": property_facilities.basic_smoking_rooms,
                        "swimming_pool": property_facilities.basic_swimming_pool,
                        "telephone": property_facilities.basic_telephone,
                        "torch": property_facilities.basic_torch,
                        "umbrellas": property_facilities.basic_umbrellas,
                        "cable_tv": property_facilities.basic_cable_tv,
                        "king_sized_beds": property_facilities.basic_king_sized_beds,
                        "wardrobe": property_facilities.basic_wardrobe,
                        "oven": property_facilities.basic_oven,
                        "hdtv": property_facilities.basic_hdtv,
                        "sanitizers": property_facilities.basic_sanitizers,
                        "private_entrance": property_facilities.basic_private_entrance,
                        "vending_machine": property_facilities.basic_vending_machine,
                        "laundromat": property_facilities.basic_laundromat,
                        "public_restrooms": property_facilities.basic_public_restrooms,
                        "wifi": property_facilities.basic_wifi,
                        "comfortable_beds": property_facilities.basic_comfortable_beds,
                        "washing_machine": property_facilities.basic_washing_machine,
                    },
                    "general": {
                        "bellboy_service": property_facilities.general_bellboy_service,
                        "caretaker": property_facilities.general_caretaker,
                        "concierge": property_facilities.general_concierge,
                        "luggage_assistance": property_facilities.general_luggage_assistance,
                        "luggage_storage": property_facilities.general_luggage_storage,
                        "mail_services": property_facilities.general_mail_services,
                        "wake_up_service": property_facilities.general_wake_up_service,
                        "wheelchair": property_facilities.general_wheelchair,
                        "electrical_sockets": property_facilities.general_electrical_sockets,
                        "doctor_on_call": property_facilities.general_doctor_on_call,
                        "medical_centre": property_facilities.general_medical_centre,
                        "tour_assistance": property_facilities.general_tour_assistance,
                        "pool_towels": property_facilities.general_pool_towels,
                        "welcome_kit": property_facilities.general_welcome_kit,
                        "welcome_drinks": property_facilities.general_welcome_drinks,
                        "shower": property_facilities.general_shower,
                    },
                    "outdoor": {
                        "beach": property_facilities.outdoor_beach,
                        "kayakas": property_facilities.outdoor_kayakas,
                        "golf": property_facilities.outdoor_golf,
                        "boat_ride": property_facilities.outdoor_boat_ride,
                        "outdoor_sports": property_facilities.outdoor_outdoor_sports,
                        "sea_plane": property_facilities.outdoor_sea_plane,
                        "snorkelling": property_facilities.outdoor_snorkelling,
                        "telescope": property_facilities.outdoor_telescope,
                        "water_sports": property_facilities.outdoor_water_sports,
                        "vehicle_rentals": property_facilities.outdoor_vehicle_rentals,
                        "skiing": property_facilities.outdoor_skiing,
                        "jungle_safari": property_facilities.outdoor_jungle_safari,
                        "cycling": property_facilities.outdoor_cycling,
                    },
                    "common": {
                        "aquarium": property_facilities.common_aquarium,
                        "balcony": property_facilities.common_balcony,
                        "fireplace": property_facilities.common_fireplace,
                        "library": property_facilities.common_library,
                        "reception": property_facilities.common_reception,
                        "seating_area": property_facilities.common_seating_area,
                        "sun_deck": property_facilities.common_sun_deck,
                        "temple": property_facilities.common_temple,
                        "prayer_room": property_facilities.common_prayer_room,
                        "living_room": property_facilities.common_living_room,
                        "outdoor_furniture": property_facilities.common_outdoor_furniture,
                        "picnic_area": property_facilities.common_picnic_area,
                        "game_room": property_facilities.common_game_room,
                    },
                    "food": {
                        "bar": property_facilities.food_bar,
                        "minibar": property_facilities.food_minibar,
                        "barbeque": property_facilities.food_barbeque,
                        "cafe": property_facilities.food_cafe,
                        "coffee_shop": property_facilities.food_coffee_shop,
                        "coffee_machine": property_facilities.food_coffee_machine,
                        "dining_area": property_facilities.food_dining_area,
                        "kids_meals": property_facilities.food_kids_meals,
                        "restaurant": property_facilities.food_restaurant,
                        "special_diet_meals": property_facilities.food_special_diet_meals,
                        "cooking_class": property_facilities.food_cooking_class,
                        "bakery": property_facilities.food_bakery,
                    },
                    "wellness": {
                        "fitness_centre": property_facilities.wellness_fitness_centre,
                        "reflexology": property_facilities.wellness_reflexology,
                        "activity_centre": property_facilities.wellness_activity_centre,
                        "yoga": property_facilities.wellness_yoga,
                        "meditation_room": property_facilities.wellness_meditation_room,
                        "aerobics": property_facilities.wellness_aerobics,
                        "first_aid_services": property_facilities.wellness_first_aid_services,
                        "solarium": property_facilities.wellness_solarium,
                        "hot_spring_bath": property_facilities.wellness_hot_spring_bath,
                    },
                    "business": {
                        "banquet": property_facilities.business_banquet,
                        "business_center": property_facilities.business_business_center,
                        "business_services": property_facilities.business_business_services,
                        "conference_room": property_facilities.business_conference_room,
                        "photocopying": property_facilities.business_photocopying,
                        "fax_service": property_facilities.business_fax_service,
                        "printer": property_facilities.business_printer,
                    },
                    "spa": {
                        "facial_treatments": property_facilities.spa_facial_treatments,
                        "hair_treatment": property_facilities.spa_hair_treatment,
                        "massage": property_facilities.spa_massage,
                        "saloon": property_facilities.spa_saloon,
                        "steam_sauna": property_facilities.spa_steam_sauna,
                        "house_spa": property_facilities.spa_house_spa,
                        "open_air_bath": property_facilities.spa_open_air_bath,
                        "public_bath": property_facilities.spa_public_bath,
                        "hammam": property_facilities.spa_hammam,
                    },
                    "security": {
                        "bodyguards": property_facilities.security_bodyguards,
                        "electronic_keycard": property_facilities.security_electronic_keycard,
                        "emergency_exit_map": property_facilities.security_emergency_exit_map,
                        "safe": property_facilities.security_safe,
                        "security": property_facilities.security_security,
                        "cctv": property_facilities.security_cctv,
                        "fire_extinguishers": property_facilities.security_fire_extinguishers,
                        "safety_security": property_facilities.security_safety_security,
                        "security_alarms": property_facilities.security_security_alarms,
                        "smoke_alarms": property_facilities.security_smoke_alarms,
                    },
                    "transfers": {
                        "airport_transfers": property_facilities.transfers_airport_transfers,
                        "railway_station_transfers": property_facilities.transfers_railway_station_transfers,
                        "bus_station_transfers": property_facilities.transfers_bus_station_transfers,
                        "public_transit_tickets": property_facilities.transfers_public_transit_tickets,
                        "shuttle_service": property_facilities.transfers_shuttle_service,
                        "transportation": property_facilities.transfers_transportation,
                        "amazing_views": property_facilities.transfers_amazing_views,
                        "city_tours": property_facilities.transfers_city_tours,
                    },
                    "payment": {
                        "currency_exchange": property_facilities.payment_currency_exchange,
                        "atm": property_facilities.payment_atm,
                    },
                    "media": {
                        "electrical_adapters_available": property_facilities.media_electrical_adapters_available,
                        "electrical_chargers": property_facilities.media_electrical_chargers,
                        "laptops": property_facilities.media_laptops,
                        "tv": property_facilities.media_tv,
                    },
                    "indoor": {
                        "indoor_games": property_facilities.indoor_indoor_games,
                        "casino": property_facilities.indoor_casino,
                        "ludo": property_facilities.indoor_ludo,
                        "carrom": property_facilities.indoor_carrom,
                        "chess": property_facilities.indoor_chess,
                    },
                    "family": {
                        "childcare_service": property_facilities.family_childcare_service,
                        "play_area": property_facilities.family_play_area,
                        "kids_club": property_facilities.family_kids_club,
                        "strollers": property_facilities.family_strollers,
                        "playground": property_facilities.family_playground,
                    },
                    "safety": {
                        "disinfection": property_facilities.safety_disinfection,
                        "shoe_covers": property_facilities.safety_shoe_covers,
                        "hair_nets": property_facilities.safety_hair_nets,
                        "ppe": property_facilities.safety_ppe,
                        "hospital": property_facilities.safety_hospital,
                        "certificate": property_facilities.safety_certificate,
                        "disposable_serveware": property_facilities.safety_disposable_serveware,
                        "exit_points": property_facilities.safety_exit_points,
                        "dispensors": property_facilities.safety_dispensors,
                        "sanitizers_installed": property_facilities.safety_sanitizers_installed,
                        "masks": property_facilities.safety_masks,
                        "disinfectant_wipes": property_facilities.safety_disinfectant_wipes,
                        "gloves": property_facilities.safety_gloves,
                        "contactless_check_in": property_facilities.safety_contactless_check_in,
                        "safety_kit": property_facilities.safety_safety_kit,
                    },
                    "pet": {
                        "pet_bowls": property_facilities.pet_pet_bowls,
                        "pet_baskets": property_facilities.pet_pet_baskets,
                    },
                    "entertainment": {
                        "events": property_facilities.entertainment_events,
                        "pub": property_facilities.entertainment_pub,
                        "photo_session": property_facilities.entertainment_photo_session,
                        "night_club": property_facilities.entertainment_night_club,
                        "beach_club": property_facilities.entertainment_beach_club,
                        "radio": property_facilities.entertainment_radio,
                    },
                    "shopping": {
                        "book_shop": property_facilities.shopping_book_shop,
                        "grocery": property_facilities.shopping_grocery,
                        "shops": property_facilities.shopping_shops,
                        "souvenir_shop": property_facilities.shopping_souvenir_shop,
                        "jewellery_shop": property_facilities.shopping_jewellery_shop,
                    },
                    "additional_info": property_facilities.additional_info,
                    "is_completed": property_facilities.is_completed,
                }

                return Response(
                    {"success": True, "data": data}, status=status.HTTP_200_OK
                )

            except PropertyFacilities.DoesNotExist:
                # Return empty structure with all categories
                empty_data = {
                    "basic": {},
                    "general": {},
                    "outdoor": {},
                    "common": {},
                    "food": {},
                    "wellness": {},
                    "business": {},
                    "spa": {},
                    "security": {},
                    "transfers": {},
                    "payment": {},
                    "media": {},
                    "indoor": {},
                    "family": {},
                    "safety": {},
                    "pet": {},
                    "entertainment": {},
                    "shopping": {},
                    "additional_info": "",
                    "is_completed": False,
                }
                return Response(
                    {"success": True, "data": empty_data}, status=status.HTTP_200_OK
                )

        except FormSession.DoesNotExist:
            return Response(
                {"error": "Invalid session ID"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request, session_id):
        """Save or update property facilities"""
        try:
            form_session = get_object_or_404(FormSession, session_id=session_id)
            data = request.data

            # Helper function to get boolean value safely
            def get_bool(category, field):
                return data.get(category, {}).get(field, False)

            # Create defaults dictionary
            defaults = {
                # Basic facilities
                "basic_air_conditioning": get_bool("basic", "air_conditioning"),
                "basic_bathroom": get_bool("basic", "bathroom"),
                "basic_dry_cleaning_services": get_bool("basic", "dry_cleaning_services"),
                "basic_daily_housekeeping": get_bool("basic", "daily_housekeeping"),
                "basic_intercom": get_bool("basic", "intercom"),
                "basic_ironing_services": get_bool("basic", "ironing_services"),
                "basic_lan": get_bool("basic", "lan"),
                "basic_laundry": get_bool("basic", "laundry"),
                "basic_newspaper": get_bool("basic", "newspaper"),
                "basic_power_backup": get_bool("basic", "power_backup"),
                "basic_parking": get_bool("basic", "parking"),
                "basic_refrigerator": get_bool("basic", "refrigerator"),
                "basic_microwave": get_bool("basic", "microwave"),
                "basic_room_service": get_bool("basic", "room_service"),
                "basic_smoke_detector": get_bool("basic", "smoke_detector"),
                "basic_smoking_rooms": get_bool("basic", "smoking_rooms"),
                "basic_swimming_pool": get_bool("basic", "swimming_pool"),
                "basic_telephone": get_bool("basic", "telephone"),
                "basic_torch": get_bool("basic", "torch"),
                "basic_umbrellas": get_bool("basic", "umbrellas"),
                "basic_cable_tv": get_bool("basic", "cable_tv"),
                "basic_king_sized_beds": get_bool("basic", "king_sized_beds"),
                "basic_wardrobe": get_bool("basic", "wardrobe"),
                "basic_oven": get_bool("basic", "oven"),
                "basic_hdtv": get_bool("basic", "hdtv"),
                "basic_sanitizers": get_bool("basic", "sanitizers"),
                "basic_private_entrance": get_bool("basic", "private_entrance"),
                "basic_vending_machine": get_bool("basic", "vending_machine"),
                "basic_laundromat": get_bool("basic", "laundromat"),
                "basic_public_restrooms": get_bool("basic", "public_restrooms"),
                "basic_wifi": get_bool("basic", "wifi"),
                "basic_comfortable_beds": get_bool("basic", "comfortable_beds"),
                "basic_washing_machine": get_bool("basic", "washing_machine"),

                # General facilities
                "general_bellboy_service": get_bool("general", "bellboy_service"),
                "general_caretaker": get_bool("general", "caretaker"),
                "general_concierge": get_bool("general", "concierge"),
                "general_luggage_assistance": get_bool("general", "luggage_assistance"),
                "general_luggage_storage": get_bool("general", "luggage_storage"),
                "general_mail_services": get_bool("general", "mail_services"),
                "general_wake_up_service": get_bool("general", "wake_up_service"),
                "general_wheelchair": get_bool("general", "wheelchair"),
                "general_electrical_sockets": get_bool("general", "electrical_sockets"),
                "general_doctor_on_call": get_bool("general", "doctor_on_call"),
                "general_medical_centre": get_bool("general", "medical_centre"),
                "general_tour_assistance": get_bool("general", "tour_assistance"),
                "general_pool_towels": get_bool("general", "pool_towels"),
                "general_welcome_kit": get_bool("general", "welcome_kit"),
                "general_welcome_drinks": get_bool("general", "welcome_drinks"),
                "general_shower": get_bool("general", "shower"),

                # Outdoor facilities
                "outdoor_beach": get_bool("outdoor", "beach"),
                "outdoor_kayakas": get_bool("outdoor", "kayakas"),
                "outdoor_golf": get_bool("outdoor", "golf"),
                "outdoor_boat_ride": get_bool("outdoor", "boat_ride"),
                "outdoor_outdoor_sports": get_bool("outdoor", "outdoor_sports"),
                "outdoor_sea_plane": get_bool("outdoor", "sea_plane"),
                "outdoor_snorkelling": get_bool("outdoor", "snorkelling"),
                "outdoor_telescope": get_bool("outdoor", "telescope"),
                "outdoor_water_sports": get_bool("outdoor", "water_sports"),
                "outdoor_vehicle_rentals": get_bool("outdoor", "vehicle_rentals"),
                "outdoor_skiing": get_bool("outdoor", "skiing"),
                "outdoor_jungle_safari": get_bool("outdoor", "jungle_safari"),
                "outdoor_cycling": get_bool("outdoor", "cycling"),

                # Common areas
                "common_aquarium": get_bool("common", "aquarium"),
                "common_balcony": get_bool("common", "balcony"),
                "common_fireplace": get_bool("common", "fireplace"),
                "common_library": get_bool("common", "library"),
                "common_reception": get_bool("common", "reception"),
                "common_seating_area": get_bool("common", "seating_area"),
                "common_sun_deck": get_bool("common", "sun_deck"),
                "common_temple": get_bool("common", "temple"),
                "common_prayer_room": get_bool("common", "prayer_room"),
                "common_living_room": get_bool("common", "living_room"),
                "common_outdoor_furniture": get_bool("common", "outdoor_furniture"),
                "common_picnic_area": get_bool("common", "picnic_area"),
                "common_game_room": get_bool("common", "game_room"),

                # Food facilities
                "food_bar": get_bool("food", "bar"),
                "food_minibar": get_bool("food", "minibar"),
                "food_barbeque": get_bool("food", "barbeque"),
                "food_cafe": get_bool("food", "cafe"),
                "food_coffee_shop": get_bool("food", "coffee_shop"),
                "food_coffee_machine": get_bool("food", "coffee_machine"),
                "food_dining_area": get_bool("food", "dining_area"),
                "food_kids_meals": get_bool("food", "kids_meals"),
                "food_restaurant": get_bool("food", "restaurant"),
                "food_special_diet_meals": get_bool("food", "special_diet_meals"),
                "food_cooking_class": get_bool("food", "cooking_class"),
                "food_bakery": get_bool("food", "bakery"),

                # Wellness facilities
                "wellness_fitness_centre": get_bool("wellness", "fitness_centre"),
                "wellness_reflexology": get_bool("wellness", "reflexology"),
                "wellness_activity_centre": get_bool("wellness", "activity_centre"),
                "wellness_yoga": get_bool("wellness", "yoga"),
                "wellness_meditation_room": get_bool("wellness", "meditation_room"),
                "wellness_aerobics": get_bool("wellness", "aerobics"),
                "wellness_first_aid_services": get_bool("wellness", "first_aid_services"),
                "wellness_solarium": get_bool("wellness", "solarium"),
                "wellness_hot_spring_bath": get_bool("wellness", "hot_spring_bath"),

                # Business facilities
                "business_banquet": get_bool("business", "banquet"),
                "business_business_center": get_bool("business", "business_center"),
                "business_business_services": get_bool("business", "business_services"),
                "business_conference_room": get_bool("business", "conference_room"),
                "business_photocopying": get_bool("business", "photocopying"),
                "business_fax_service": get_bool("business", "fax_service"),
                "business_printer": get_bool("business", "printer"),

                # Spa facilities
                "spa_facial_treatments": get_bool("spa", "facial_treatments"),
                "spa_hair_treatment": get_bool("spa", "hair_treatment"),
                "spa_massage": get_bool("spa", "massage"),
                "spa_saloon": get_bool("spa", "saloon"),
                "spa_steam_sauna": get_bool("spa", "steam_sauna"),
                "spa_house_spa": get_bool("spa", "house_spa"),
                "spa_open_air_bath": get_bool("spa", "open_air_bath"),
                "spa_public_bath": get_bool("spa", "public_bath"),
                "spa_hammam": get_bool("spa", "hammam"),

                # Security facilities
                "security_bodyguards": get_bool("security", "bodyguards"),
                "security_electronic_keycard": get_bool("security", "electronic_keycard"),
                "security_emergency_exit_map": get_bool("security", "emergency_exit_map"),
                "security_safe": get_bool("security", "safe"),
                "security_security": get_bool("security", "security"),
                "security_cctv": get_bool("security", "cctv"),
                "security_fire_extinguishers": get_bool("security", "fire_extinguishers"),
                "security_safety_security": get_bool("security", "safety_security"),
                "security_security_alarms": get_bool("security", "security_alarms"),
                "security_smoke_alarms": get_bool("security", "smoke_alarms"),

                # Transfer facilities
                "transfers_airport_transfers": get_bool("transfers", "airport_transfers"),
                "transfers_railway_station_transfers": get_bool("transfers", "railway_station_transfers"),
                "transfers_bus_station_transfers": get_bool("transfers", "bus_station_transfers"),
                "transfers_public_transit_tickets": get_bool("transfers", "public_transit_tickets"),
                "transfers_shuttle_service": get_bool("transfers", "shuttle_service"),
                "transfers_transportation": get_bool("transfers", "transportation"),
                "transfers_amazing_views": get_bool("transfers", "amazing_views"),
                "transfers_city_tours": get_bool("transfers", "city_tours"),

                # Payment facilities
                "payment_currency_exchange": get_bool("payment", "currency_exchange"),
                "payment_atm": get_bool("payment", "atm"),

                # Media facilities
                "media_electrical_adapters_available": get_bool("media", "electrical_adapters_available"),
                "media_electrical_chargers": get_bool("media", "electrical_chargers"),
                "media_laptops": get_bool("media", "laptops"),
                "media_tv": get_bool("media", "tv"),

                # Indoor facilities
                "indoor_indoor_games": get_bool("indoor", "indoor_games"),
                "indoor_casino": get_bool("indoor", "casino"),
                "indoor_ludo": get_bool("indoor", "ludo"),
                "indoor_carrom": get_bool("indoor", "carrom"),
                "indoor_chess": get_bool("indoor", "chess"),

                # Family facilities
                "family_childcare_service": get_bool("family", "childcare_service"),
                "family_play_area": get_bool("family", "play_area"),
                "family_kids_club": get_bool("family", "kids_club"),
                "family_strollers": get_bool("family", "strollers"),
                "family_playground": get_bool("family", "playground"),

                # Safety facilities
                "safety_disinfection": get_bool("safety", "disinfection"),
                "safety_shoe_covers": get_bool("safety", "shoe_covers"),
                "safety_hair_nets": get_bool("safety", "hair_nets"),
                "safety_ppe": get_bool("safety", "ppe"),
                "safety_hospital": get_bool("safety", "hospital"),
                "safety_certificate": get_bool("safety", "certificate"),
                "safety_disposable_serveware": get_bool("safety", "disposable_serveware"),
                "safety_exit_points": get_bool("safety", "exit_points"),
                "safety_dispensors": get_bool("safety", "dispensors"),
                "safety_sanitizers_installed": get_bool("safety", "sanitizers_installed"),
                "safety_masks": get_bool("safety", "masks"),
                "safety_disinfectant_wipes": get_bool("safety", "disinfectant_wipes"),
                "safety_gloves": get_bool("safety", "gloves"),
                "safety_contactless_check_in": get_bool("safety", "contactless_check_in"),
                "safety_safety_kit": get_bool("safety", "safety_kit"),

                # Pet facilities
                "pet_pet_bowls": get_bool("pet", "pet_bowls"),
                "pet_pet_baskets": get_bool("pet", "pet_baskets"),

                # Entertainment facilities
                "entertainment_events": get_bool("entertainment", "events"),
                "entertainment_pub": get_bool("entertainment", "pub"),
                "entertainment_photo_session": get_bool("entertainment", "photo_session"),
                "entertainment_night_club": get_bool("entertainment", "night_club"),
                "entertainment_beach_club": get_bool("entertainment", "beach_club"),
                "entertainment_radio": get_bool("entertainment", "radio"),

                # Shopping facilities
                "shopping_book_shop": get_bool("shopping", "book_shop"),
                "shopping_grocery": get_bool("shopping", "grocery"),
                "shopping_shops": get_bool("shopping", "shops"),
                "shopping_souvenir_shop": get_bool("shopping", "souvenir_shop"),
                "shopping_jewellery_shop": get_bool("shopping", "jewellery_shop"),

                # Additional info
                "additional_info": data.get("additional_info", ""),
                "is_completed": True,
            }

            property_facilities, created = PropertyFacilities.objects.get_or_create(
                form_session=form_session,
                defaults=defaults
            )

            if not created:
                # Update existing record
                for field, value in defaults.items():
                    setattr(property_facilities, field, value)
                property_facilities.save()

            # Update form session step
            if form_session.current_step < 7: 
                form_session.current_step = 7
                form_session.save()

            return Response(
                {
                    "success": True,
                    "message": "Property facilities saved successfully",
                    "next_step": 7,
                },
                status=status.HTTP_200_OK,
            )

        except FormSession.DoesNotExist:
            return Response(
                {"error": "Invalid session ID"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )