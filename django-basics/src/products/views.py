from django.shortcuts import render, get_object_or_404, redirect

from .models import Product
from .forms import ProductForm, RawProductForm

# def product_create_view(request):
#     form = ProductForm(request.POST or None)
#     if form.is_valid():
#           form.save()
#             ## do something after the form is saved

#     context = { 'form' : form}

#     return render(request, 'product/create.html', context)

def product_create_view(request):
    my_form = RawProductForm()
    if request.method == 'POST':
        my_form = RawProductForm(request.POST)
        
    if my_form.is_valid():
        print(my_form.cleaned_data)
        Product.objects.create(**my_form.cleaned_data)
    else:
        print(my_form.errors)

    context = {
        'form': my_form
    }

    return render(request, 'product/create.html', context)

def product_detail_view(request):
	obj = Product.objects.get(id=1)
	context = {
		'title' : obj.title,
	    'description' : obj.description}

	return render(request, 'product/detail.html', context)
    
def dynamic_product_detail_view(request, my_id):
    # obj = Product.objects.get(id=my_id)
    if my_id:
        obj = get_object_or_404(Product, id=my_id)

        context = {
             'object' : obj
        }
        return render(request, 'product/detail.html',context)
    else:
        #product list view
        return redirect('products/')



def product_delete_view(request, id):
    obj = get_object_or_404(Product, id=id)

    if request.method == 'POST':
        obj.delete()
        return redirect('/')
    else:
        context = {'object' : obj}
        return render(request, 'product/delete.html',context)

def product_list_view(request):
    objs = Product.objects.all()
    context = {'object_list' : objs}

    return render(request, 'product/list.html', context)